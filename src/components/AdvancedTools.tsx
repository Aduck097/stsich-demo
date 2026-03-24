import { useState, type ReactNode } from "react";
import { FileJson2, Fingerprint, Palette } from "lucide-react";

function Panel({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <div className="bg-surface-container-lowest rounded-[2rem] p-6 md:p-8 editorial-shadow border border-surface-container-high/70">
      <div className="mb-6">
        <h3 className="text-2xl font-bold tracking-tight text-on-surface mb-2">{title}</h3>
        <p className="text-on-surface-variant leading-relaxed">{description}</p>
      </div>
      {children}
    </div>
  );
}

function FieldLabel({ children }: { children: ReactNode }) {
  return <label className="text-sm font-semibold text-on-surface block mb-2">{children}</label>;
}

function decodeBase64Url(value: string) {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "=");
  const binary = atob(padded);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

function toPascalCase(value: string) {
  return value
    .replace(/[^a-zA-Z0-9]+/g, " ")
    .split(" ")
    .filter(Boolean)
    .map((item) => item[0].toUpperCase() + item.slice(1))
    .join("") || "RootObject";
}

function toSafeKey(key: string) {
  return /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(key) ? key : `"${key}"`;
}

function convertJsonToTs(source: string, rootName: string) {
  const interfaces: string[] = [];

  const inferType = (value: unknown, name: string): string => {
    if (value === null) return "null";
    if (Array.isArray(value)) {
      if (value.length === 0) return "unknown[]";
      return `${inferType(value[0], `${name}Item`)}[]`;
    }

    if (typeof value === "object") {
      const interfaceName = toPascalCase(name);
      const lines = Object.entries(value as Record<string, unknown>).map(([key, child]) => {
        const childType = inferType(child, `${interfaceName}${toPascalCase(key)}`);
        return `  ${toSafeKey(key)}: ${childType};`;
      });
      interfaces.push(`interface ${interfaceName} {\n${lines.join("\n")}\n}`);
      return interfaceName;
    }

    if (typeof value === "string") return "string";
    if (typeof value === "number") return "number";
    if (typeof value === "boolean") return "boolean";
    return "unknown";
  };

  const parsed = JSON.parse(source);
  const rootType = inferType(parsed, rootName);
  return interfaces.length
    ? `${interfaces.join("\n\n")}\n\ntype ${toPascalCase(rootName)}Result = ${rootType};`
    : `type ${toPascalCase(rootName)}Result = ${rootType};`;
}

function hexToRgb(hex: string) {
  const normalized = hex.replace("#", "").trim();
  if (![3, 6].includes(normalized.length) || /[^0-9a-fA-F]/.test(normalized)) {
    throw new Error("invalid color");
  }
  const full = normalized.length === 3 ? normalized.split("").map((char) => char + char).join("") : normalized;
  const r = Number.parseInt(full.slice(0, 2), 16);
  const g = Number.parseInt(full.slice(2, 4), 16);
  const b = Number.parseInt(full.slice(4, 6), 16);
  return { r, g, b };
}

function rgbToHsl(r: number, g: number, b: number) {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const lightness = (max + min) / 2;
  const delta = max - min;
  let hue = 0;
  let saturation = 0;

  if (delta !== 0) {
    saturation = delta / (1 - Math.abs(2 * lightness - 1));
    switch (max) {
      case rn:
        hue = 60 * (((gn - bn) / delta) % 6);
        break;
      case gn:
        hue = 60 * ((bn - rn) / delta + 2);
        break;
      default:
        hue = 60 * ((rn - gn) / delta + 4);
        break;
    }
  }

  return {
    h: Math.round(hue < 0 ? hue + 360 : hue),
    s: Math.round(saturation * 100),
    l: Math.round(lightness * 100),
  };
}

export default function AdvancedTools() {
  const [jwtInput, setJwtInput] = useState("");
  const [jwtOutput, setJwtOutput] = useState("");
  const [jwtError, setJwtError] = useState("");

  const [jsonInput, setJsonInput] = useState(`{
  "id": 1,
  "name": "Aduck097",
  "skills": ["React", "TypeScript"]
}`);
  const [tsOutput, setTsOutput] = useState("");
  const [tsError, setTsError] = useState("");

  const [colorInput, setColorInput] = useState("#0058bc");
  const [colorOutput, setColorOutput] = useState("");
  const [colorError, setColorError] = useState("");

  const handleParseJwt = () => {
    try {
      const parts = jwtInput.trim().split(".");
      if (parts.length < 2) throw new Error("invalid token");
      const header = JSON.parse(decodeBase64Url(parts[0]));
      const payload = JSON.parse(decodeBase64Url(parts[1]));
      setJwtError("");
      setJwtOutput(JSON.stringify({ header, payload }, null, 2));
    } catch {
      setJwtError("JWT 解析失败，请检查 token 是否完整。\n一般需要 header.payload.signature 这种结构。");
      setJwtOutput("");
    }
  };

  const handleJsonToTs = () => {
    try {
      setTsError("");
      setTsOutput(convertJsonToTs(jsonInput, "ToolboxRoot"));
    } catch {
      setTsError("JSON 转 TypeScript 失败，请先保证输入是合法 JSON。");
      setTsOutput("");
    }
  };

  const handleColorConvert = () => {
    try {
      const { r, g, b } = hexToRgb(colorInput);
      const { h, s, l } = rgbToHsl(r, g, b);
      setColorError("");
      setColorOutput(`RGB: ${r}, ${g}, ${b}\nHSL: ${h}, ${s}%, ${l}%`);
    } catch {
      setColorError("颜色格式不正确，请输入 3 位或 6 位十六进制颜色，例如 #0058bc。");
      setColorOutput("");
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-8 py-24">
      <div className="mb-12 max-w-3xl">
        <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-on-surface-variant mb-4">
          继续扩展
        </h2>
        <p className="text-4xl font-bold tracking-tight text-on-surface mb-4">进阶工具</p>
        <p className="text-on-surface-variant leading-relaxed text-lg">
          这里继续补开发中更高频的工具，优先解决调试、类型生成和界面开发里重复出现的问题。
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <Panel title="JWT 解析" description="把 token 的 header 和 payload 解析出来，适合接口调试和权限排查。">
          <div className="w-12 h-12 rounded-2xl bg-surface-container-high flex items-center justify-center mb-6">
            <Fingerprint className="w-6 h-6 text-primary" />
          </div>
          <FieldLabel>JWT Token</FieldLabel>
          <textarea value={jwtInput} onChange={(event) => setJwtInput(event.target.value)} className="w-full min-h-40 rounded-2xl border border-surface-container-high bg-white px-4 py-3" />
          <button type="button" onClick={handleParseJwt} className="mt-4 px-5 py-3 rounded-2xl bg-primary text-white font-semibold">解析 JWT</button>
          <FieldLabel>解析结果</FieldLabel>
          <textarea value={jwtOutput} readOnly className="w-full min-h-48 rounded-2xl border border-surface-container-high bg-surface px-4 py-3" />
          {jwtError && <p className="mt-4 text-sm text-red-600 whitespace-pre-line">{jwtError}</p>}
        </Panel>

        <Panel title="JSON 转 TypeScript" description="把接口返回的 JSON 直接转成 TypeScript 定义，写类型时会快很多。">
          <div className="w-12 h-12 rounded-2xl bg-surface-container-high flex items-center justify-center mb-6">
            <FileJson2 className="w-6 h-6 text-primary" />
          </div>
          <FieldLabel>JSON 内容</FieldLabel>
          <textarea value={jsonInput} onChange={(event) => setJsonInput(event.target.value)} className="w-full min-h-40 rounded-2xl border border-surface-container-high bg-white px-4 py-3" />
          <button type="button" onClick={handleJsonToTs} className="mt-4 px-5 py-3 rounded-2xl bg-primary text-white font-semibold">生成 TypeScript</button>
          <FieldLabel>TypeScript 定义</FieldLabel>
          <textarea value={tsOutput} readOnly className="w-full min-h-48 rounded-2xl border border-surface-container-high bg-surface px-4 py-3" />
          {tsError && <p className="mt-4 text-sm text-red-600">{tsError}</p>}
        </Panel>

        <Panel title="颜色转换" description="输入十六进制颜色，快速查看 RGB 和 HSL，做网页样式时会更顺手。">
          <div className="w-12 h-12 rounded-2xl bg-surface-container-high flex items-center justify-center mb-6">
            <Palette className="w-6 h-6 text-primary" />
          </div>
          <FieldLabel>十六进制颜色</FieldLabel>
          <input value={colorInput} onChange={(event) => setColorInput(event.target.value)} placeholder="#0058bc" className="w-full rounded-2xl border border-surface-container-high bg-white px-4 py-3" />
          <button type="button" onClick={handleColorConvert} className="mt-4 px-5 py-3 rounded-2xl bg-primary text-white font-semibold">转换颜色</button>
          <div className="mt-6 flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl border border-surface-container-high" style={{ backgroundColor: colorInput }}></div>
            <p className="text-sm text-on-surface-variant">当前颜色预览</p>
          </div>
          <FieldLabel>转换结果</FieldLabel>
          <textarea value={colorOutput} readOnly className="w-full min-h-40 rounded-2xl border border-surface-container-high bg-surface px-4 py-3" />
          {colorError && <p className="mt-4 text-sm text-red-600">{colorError}</p>}
        </Panel>
      </div>
    </section>
  );
}
