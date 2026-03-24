import { useEffect, useState, type ChangeEvent, type ComponentType, type ReactNode } from "react";
import {
  Clock3,
  Code2,
  FileCode2,
  Globe,
  House,
  Image as ImageIcon,
  Link2,
  Lock,
  QrCode,
  Sparkles,
} from "lucide-react";
import QRCode from "qrcode";

type Category = {
  id: string;
  label: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
  status: "ready" | "partial";
};

const categories: Category[] = [
  {
    id: "encoding",
    label: "编码转换",
    description: "Base64、URL、Unicode 等常用文本转换。",
    icon: Code2,
    status: "ready",
  },
  {
    id: "crypto",
    label: "加密解密",
    description: "文本哈希与密码加解密。",
    icon: Lock,
    status: "ready",
  },
  {
    id: "web",
    label: "网页相关",
    description: "URL 解析、参数查看和网页开发辅助。",
    icon: Globe,
    status: "ready",
  },
  {
    id: "editor",
    label: "在线编辑器",
    description: "JSON 格式化与文本快速处理。",
    icon: FileCode2,
    status: "ready",
  },
  {
    id: "life",
    label: "百姓生活",
    description: "日期计算这类日常也会用到的小工具。",
    icon: House,
    status: "ready",
  },
  {
    id: "qrcode",
    label: "二维码",
    description: "文本、链接即时生成二维码。",
    icon: QrCode,
    status: "ready",
  },
  {
    id: "shortlink",
    label: "内容短链",
    description: "先做短链标识生成，后续可接服务端真正发布。",
    icon: Link2,
    status: "partial",
  },
  {
    id: "image",
    label: "图片处理",
    description: "查看图片信息并做基础格式转换。",
    icon: ImageIcon,
    status: "ready",
  },
  {
    id: "online",
    label: "在线工具",
    description: "时间戳转换等高频开发小工具。",
    icon: Clock3,
    status: "ready",
  },
];

function encodeBase64(value: string) {
  const bytes = new TextEncoder().encode(value);
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary);
}

function decodeBase64(value: string) {
  const binary = atob(value);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

function bytesToBase64(bytes: Uint8Array) {
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary);
}

function base64ToBytes(value: string) {
  const binary = atob(value);
  return Uint8Array.from(binary, (char) => char.charCodeAt(0));
}

async function sha256(text: string) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return Array.from(new Uint8Array(digest))
    .map((item) => item.toString(16).padStart(2, "0"))
    .join("");
}

async function deriveAesKey(password: string, salt: Uint8Array) {
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveKey"],
  );

  return crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt,
      iterations: 100000,
      hash: "SHA-256",
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"],
  );
}

async function encryptText(text: string, password: string) {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const key = await deriveAesKey(password, salt);
  const encrypted = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    new TextEncoder().encode(text),
  );

  const result = new Uint8Array(salt.length + iv.length + encrypted.byteLength);
  result.set(salt, 0);
  result.set(iv, salt.length);
  result.set(new Uint8Array(encrypted), salt.length + iv.length);
  return bytesToBase64(result);
}

async function decryptText(value: string, password: string) {
  const combined = base64ToBytes(value.trim());
  const salt = combined.slice(0, 16);
  const iv = combined.slice(16, 28);
  const data = combined.slice(28);
  const key = await deriveAesKey(password, salt);
  const decrypted = await crypto.subtle.decrypt({ name: "AES-GCM", iv }, key, data);
  return new TextDecoder().decode(decrypted);
}

function slugify(value: string) {
  const normalized = value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 32);

  const suffix = Math.random().toString(36).slice(2, 6);
  return normalized ? `${normalized}-${suffix}` : `link-${suffix}`;
}

function formatFileSize(size: number) {
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
  return `${(size / (1024 * 1024)).toFixed(2)} MB`;
}

function Panel({ title, description, children }: { title: string; description: string; children: ReactNode }) {
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

export default function Toolbox() {
  const [selectedCategory, setSelectedCategory] = useState("encoding");

  const [encodingType, setEncodingType] = useState("base64");
  const [encodingInput, setEncodingInput] = useState("");
  const [encodingOutput, setEncodingOutput] = useState("");
  const [encodingError, setEncodingError] = useState("");

  const [cryptoInput, setCryptoInput] = useState("");
  const [cryptoPassword, setCryptoPassword] = useState("");
  const [cryptoOutput, setCryptoOutput] = useState("");
  const [cryptoError, setCryptoError] = useState("");

  const [webInput, setWebInput] = useState("https://example.com/path?name=codex&lang=zh");
  const [webDetails, setWebDetails] = useState("");
  const [webError, setWebError] = useState("");

  const [editorInput, setEditorInput] = useState(`{
  "name": "Aduck097",
  "role": "programmer"
}`);
  const [editorOutput, setEditorOutput] = useState("");
  const [editorError, setEditorError] = useState("");

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [qrInput, setQrInput] = useState("https://aduck097.github.io/stsich-demo/");
  const [qrDataUrl, setQrDataUrl] = useState("");

  const [shortlinkInput, setShortlinkInput] = useState("");
  const [shortCode, setShortCode] = useState("");

  const [timestampInput, setTimestampInput] = useState(String(Math.floor(Date.now() / 1000)));
  const [dateInput, setDateInput] = useState("");

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [imageInfo, setImageInfo] = useState<{
    width: number;
    height: number;
    type: string;
    size: string;
    name: string;
  } | null>(null);
  const [imageError, setImageError] = useState("");

  useEffect(() => {
    if (!qrInput.trim()) {
      setQrDataUrl("");
      return;
    }

    QRCode.toDataURL(qrInput, {
      margin: 1,
      width: 320,
      color: {
        dark: "#111827",
        light: "#ffffff",
      },
    })
      .then((value) => setQrDataUrl(value))
      .catch(() => setQrDataUrl(""));
  }, [qrInput]);

  useEffect(() => {
    if (!imageFile) {
      setImageUrl("");
      setImageInfo(null);
      return;
    }

    const objectUrl = URL.createObjectURL(imageFile);
    setImageUrl(objectUrl);
    setImageError("");

    const img = new Image();
    img.onload = () => {
      setImageInfo({
        width: img.width,
        height: img.height,
        type: imageFile.type || "未知格式",
        size: formatFileSize(imageFile.size),
        name: imageFile.name,
      });
    };
    img.onerror = () => setImageError("图片读取失败，请换一张图片重试。");
    img.src = objectUrl;

    return () => URL.revokeObjectURL(objectUrl);
  }, [imageFile]);

  const lifeSummary = (() => {
    if (!startDate || !endDate) return "请选择开始和结束日期。";
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diff = end.getTime() - start.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (Number.isNaN(days)) return "日期无效。";
    return `相差 ${days} 天（按自然日换算）。`;
  })();

  const timestampSummary = (() => {
    if (!timestampInput.trim()) return "请输入时间戳。";
    const value = Number(timestampInput);
    if (Number.isNaN(value)) return "时间戳格式不正确。";
    const date = new Date(timestampInput.length === 13 ? value : value * 1000);
    return date.toLocaleString("zh-CN", { hour12: false });
  })();

  const dateToTimestampSummary = (() => {
    if (!dateInput) return "请选择日期时间。";
    const date = new Date(dateInput);
    if (Number.isNaN(date.getTime())) return "日期时间格式不正确。";
    return `秒级：${Math.floor(date.getTime() / 1000)} / 毫秒级：${date.getTime()}`;
  })();

  const handleEncode = (action: "encode" | "decode") => {
    try {
      setEncodingError("");
      if (encodingType === "base64") {
        setEncodingOutput(action === "encode" ? encodeBase64(encodingInput) : decodeBase64(encodingInput));
        return;
      }
      if (encodingType === "url") {
        setEncodingOutput(action === "encode" ? encodeURIComponent(encodingInput) : decodeURIComponent(encodingInput));
        return;
      }
      if (action === "encode") {
        setEncodingOutput(
          Array.from(encodingInput)
            .map((char: string) => `\\u${char.charCodeAt(0).toString(16).padStart(4, "0")}`)
            .join(""),
        );
      } else {
        setEncodingOutput(
          encodingInput.replace(/\\u([0-9a-fA-F]{4})/g, (_, code: string) =>
            String.fromCharCode(Number.parseInt(code, 16)),
          ),
        );
      }
    } catch {
      setEncodingError("转换失败，请检查输入内容和类型是否匹配。");
    }
  };

  const handleHash = async () => {
    try {
      setCryptoError("");
      setCryptoOutput(await sha256(cryptoInput));
    } catch {
      setCryptoError("哈希计算失败。");
    }
  };

  const handleEncrypt = async () => {
    if (!cryptoPassword) {
      setCryptoError("请输入密码后再加密。");
      return;
    }
    try {
      setCryptoError("");
      setCryptoOutput(await encryptText(cryptoInput, cryptoPassword));
    } catch {
      setCryptoError("加密失败，请重试。");
    }
  };

  const handleDecrypt = async () => {
    if (!cryptoPassword) {
      setCryptoError("请输入密码后再解密。");
      return;
    }
    try {
      setCryptoError("");
      setCryptoOutput(await decryptText(cryptoInput, cryptoPassword));
    } catch {
      setCryptoError("解密失败，请检查密文和密码是否正确。");
    }
  };

  const handleParseUrl = () => {
    try {
      const target = new URL(webInput);
      const params = Array.from(target.searchParams.entries());
      const lines = [
        `协议：${target.protocol}`,
        `主机：${target.host}`,
        `路径：${target.pathname}`,
        `锚点：${target.hash || "无"}`,
        `参数：${params.length ? params.map(([key, value]) => `${key}=${value}`).join("\n") : "无"}`,
      ];
      setWebError("");
      setWebDetails(lines.join("\n\n"));
    } catch {
      setWebError("URL 无法解析，请输入完整链接，例如 https://example.com?a=1");
      setWebDetails("");
    }
  };

  const handleJson = (mode: "format" | "minify") => {
    try {
      const parsed = JSON.parse(editorInput);
      setEditorError("");
      setEditorOutput(mode === "format" ? JSON.stringify(parsed, null, 2) : JSON.stringify(parsed));
    } catch {
      setEditorError("JSON 格式不合法，请检查逗号、引号和括号。");
      setEditorOutput("");
    }
  };

  const handleGenerateShortCode = () => {
    setShortCode(slugify(shortlinkInput));
  };

  const handleImageSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setImageFile(file);
  };

  const handleConvertImage = async (format: "image/png" | "image/jpeg") => {
    if (!imageUrl || !imageInfo) return;
    const img = new Image();
    img.src = imageUrl;
    await img.decode();

    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(img, 0, 0);

    const blob = await new Promise<Blob | null>((resolve) => {
      canvas.toBlob(resolve, format, 0.92);
    });
    if (!blob) return;

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${imageInfo.name.replace(/\.[^.]+$/, "")}.${format === "image/png" ? "png" : "jpg"}`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section id="toolbox" className="bg-surface-container-low py-32 rounded-[3rem] mx-4">
      <div className="max-w-7xl mx-auto px-8">
        <div className="mb-14 max-w-3xl">
          <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-on-surface-variant mb-4">
            在线工具
          </h2>
          <p className="text-4xl font-bold tracking-tight text-on-surface mb-4">工具箱</p>
          <p className="text-on-surface-variant leading-relaxed text-lg">
            这里放的是可直接拿来用的功能，而不是空的展示模块。你提到的分类我已经铺好，先把最常用的一批做成可交互版本，后续可以继续往里加。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mb-10">
          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = selectedCategory === category.id;
            return (
              <button
                key={category.id}
                type="button"
                onClick={() => setSelectedCategory(category.id)}
                className={`text-left p-6 rounded-[1.75rem] border transition-all duration-300 editorial-shadow ${
                  isActive
                    ? "bg-primary text-white border-primary"
                    : "bg-surface-container-lowest border-surface-container-high hover:border-primary/40 hover:-translate-y-1"
                }`}
              >
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${isActive ? "bg-white/15" : "bg-surface-container-high"}`}>
                    <Icon className={`w-6 h-6 ${isActive ? "text-white" : "text-primary"}`} />
                  </div>
                  <span className={`text-[10px] font-bold tracking-[0.25em] uppercase ${isActive ? "text-white/70" : "text-on-surface-variant"}`}>
                    {category.status === "ready" ? "可用" : "持续扩展"}
                  </span>
                </div>
                <h3 className={`text-xl font-bold mb-2 ${isActive ? "text-white" : "text-on-surface"}`}>{category.label}</h3>
                <p className={`leading-relaxed text-sm ${isActive ? "text-white/80" : "text-on-surface-variant"}`}>{category.description}</p>
              </button>
            );
          })}
        </div>

        <div className="space-y-6">
          {selectedCategory === "encoding" && (
            <Panel title="编码转换" description="支持 Base64、URL 编码和 Unicode 编解码，适合接口调试和文本转换。">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <FieldLabel>转换类型</FieldLabel>
                  <select
                    value={encodingType}
                    onChange={(event) => setEncodingType(event.target.value)}
                    className="w-full rounded-2xl border border-surface-container-high bg-white px-4 py-3"
                  >
                    <option value="base64">Base64</option>
                    <option value="url">URL 编码</option>
                    <option value="unicode">Unicode</option>
                  </select>
                </div>
                <div className="flex flex-wrap gap-3 items-end">
                  <button type="button" onClick={() => handleEncode("encode")} className="px-5 py-3 rounded-2xl bg-primary text-white font-semibold">
                    编码
                  </button>
                  <button type="button" onClick={() => handleEncode("decode")} className="px-5 py-3 rounded-2xl bg-surface-container-high text-on-surface font-semibold">
                    解码
                  </button>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <FieldLabel>输入内容</FieldLabel>
                  <textarea value={encodingInput} onChange={(event) => setEncodingInput(event.target.value)} className="w-full min-h-48 rounded-2xl border border-surface-container-high bg-white px-4 py-3" />
                </div>
                <div>
                  <FieldLabel>输出结果</FieldLabel>
                  <textarea value={encodingOutput} readOnly className="w-full min-h-48 rounded-2xl border border-surface-container-high bg-surface px-4 py-3" />
                </div>
              </div>
              {encodingError && <p className="mt-4 text-sm text-red-600">{encodingError}</p>}
            </Panel>
          )}

          {selectedCategory === "crypto" && (
            <Panel title="加密解密" description="支持 SHA-256 哈希，以及基于密码的 AES-GCM 文本加解密。所有处理都在浏览器本地完成。">
              <div className="grid md:grid-cols-[2fr_1fr] gap-6 mb-6">
                <div>
                  <FieldLabel>文本或密文</FieldLabel>
                  <textarea value={cryptoInput} onChange={(event) => setCryptoInput(event.target.value)} className="w-full min-h-48 rounded-2xl border border-surface-container-high bg-white px-4 py-3" />
                </div>
                <div>
                  <FieldLabel>密码</FieldLabel>
                  <input value={cryptoPassword} onChange={(event) => setCryptoPassword(event.target.value)} type="password" className="w-full rounded-2xl border border-surface-container-high bg-white px-4 py-3 mb-4" />
                  <div className="grid gap-3">
                    <button type="button" onClick={handleHash} className="px-5 py-3 rounded-2xl bg-surface-container-high text-on-surface font-semibold">生成 SHA-256</button>
                    <button type="button" onClick={handleEncrypt} className="px-5 py-3 rounded-2xl bg-primary text-white font-semibold">加密</button>
                    <button type="button" onClick={handleDecrypt} className="px-5 py-3 rounded-2xl bg-surface-container-high text-on-surface font-semibold">解密</button>
                  </div>
                </div>
              </div>
              <div>
                <FieldLabel>结果</FieldLabel>
                <textarea value={cryptoOutput} readOnly className="w-full min-h-40 rounded-2xl border border-surface-container-high bg-surface px-4 py-3" />
              </div>
              {cryptoError && <p className="mt-4 text-sm text-red-600">{cryptoError}</p>}
            </Panel>
          )}

          {selectedCategory === "web" && (
            <Panel title="网页相关" description="用于拆解 URL、查看查询参数，适合前端调试和页面开发。">
              <div className="grid md:grid-cols-[2fr_1fr] gap-6">
                <div>
                  <FieldLabel>链接</FieldLabel>
                  <textarea value={webInput} onChange={(event) => setWebInput(event.target.value)} className="w-full min-h-40 rounded-2xl border border-surface-container-high bg-white px-4 py-3" />
                </div>
                <div className="flex items-end">
                  <button type="button" onClick={handleParseUrl} className="w-full px-5 py-3 rounded-2xl bg-primary text-white font-semibold">解析 URL</button>
                </div>
              </div>
              <div className="mt-6">
                <FieldLabel>解析结果</FieldLabel>
                <textarea value={webDetails} readOnly className="w-full min-h-48 rounded-2xl border border-surface-container-high bg-surface px-4 py-3" />
              </div>
              {webError && <p className="mt-4 text-sm text-red-600">{webError}</p>}
            </Panel>
          )}

          {selectedCategory === "editor" && (
            <Panel title="在线编辑器" description="先提供 JSON 格式化和压缩，适合接口返回结果和配置文件快速整理。">
              <div className="flex flex-wrap gap-3 mb-6">
                <button type="button" onClick={() => handleJson("format")} className="px-5 py-3 rounded-2xl bg-primary text-white font-semibold">格式化 JSON</button>
                <button type="button" onClick={() => handleJson("minify")} className="px-5 py-3 rounded-2xl bg-surface-container-high text-on-surface font-semibold">压缩 JSON</button>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <FieldLabel>输入内容</FieldLabel>
                  <textarea value={editorInput} onChange={(event) => setEditorInput(event.target.value)} className="w-full min-h-56 rounded-2xl border border-surface-container-high bg-white px-4 py-3" />
                </div>
                <div>
                  <FieldLabel>处理结果</FieldLabel>
                  <textarea value={editorOutput} readOnly className="w-full min-h-56 rounded-2xl border border-surface-container-high bg-surface px-4 py-3" />
                </div>
              </div>
              {editorError && <p className="mt-4 text-sm text-red-600">{editorError}</p>}
            </Panel>
          )}

          {selectedCategory === "life" && (
            <Panel title="百姓生活" description="先放一个最常用的日期间隔计算，后面可以继续加房贷、个税、年龄计算等功能。">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <FieldLabel>开始日期</FieldLabel>
                  <input value={startDate} onChange={(event) => setStartDate(event.target.value)} type="date" className="w-full rounded-2xl border border-surface-container-high bg-white px-4 py-3" />
                </div>
                <div>
                  <FieldLabel>结束日期</FieldLabel>
                  <input value={endDate} onChange={(event) => setEndDate(event.target.value)} type="date" className="w-full rounded-2xl border border-surface-container-high bg-white px-4 py-3" />
                </div>
              </div>
              <div className="rounded-2xl bg-surface px-5 py-4 text-on-surface font-medium">{lifeSummary}</div>
            </Panel>
          )}

          {selectedCategory === "qrcode" && (
            <Panel title="二维码" description="输入任意文本或网址即可生成二维码，适合快速分享页面和内容。">
              <div className="grid lg:grid-cols-[1.5fr_1fr] gap-6 items-start">
                <div>
                  <FieldLabel>二维码内容</FieldLabel>
                  <textarea value={qrInput} onChange={(event) => setQrInput(event.target.value)} className="w-full min-h-40 rounded-2xl border border-surface-container-high bg-white px-4 py-3" />
                </div>
                <div className="bg-surface rounded-[1.75rem] p-5 flex items-center justify-center min-h-72">
                  {qrDataUrl ? (
                    <img src={qrDataUrl} alt="二维码预览" className="w-56 h-56 rounded-2xl bg-white p-3" />
                  ) : (
                    <p className="text-on-surface-variant text-sm">输入内容后自动生成二维码</p>
                  )}
                </div>
              </div>
            </Panel>
          )}

          {selectedCategory === "shortlink" && (
            <Panel title="内容短链" description="真正可访问的短链需要服务端保存映射关系和跳转逻辑。我先给你放一个短链标识生成器，后续接 API 就能变成完整短链系统。">
              <div className="grid md:grid-cols-[2fr_1fr] gap-6 items-end">
                <div>
                  <FieldLabel>标题或内容描述</FieldLabel>
                  <input value={shortlinkInput} onChange={(event) => setShortlinkInput(event.target.value)} placeholder="例如：React 部署说明" className="w-full rounded-2xl border border-surface-container-high bg-white px-4 py-3" />
                </div>
                <button type="button" onClick={handleGenerateShortCode} className="px-5 py-3 rounded-2xl bg-primary text-white font-semibold">生成标识</button>
              </div>
              <div className="mt-6 rounded-2xl bg-surface px-5 py-4">
                <p className="text-sm text-on-surface-variant mb-2">建议短链标识</p>
                <p className="font-semibold text-on-surface break-all">{shortCode || "等待生成"}</p>
              </div>
            </Panel>
          )}

          {selectedCategory === "image" && (
            <Panel title="图片处理" description="先提供图片信息查看和 PNG/JPG 格式转换，适合快速处理网页素材。">
              <div className="grid lg:grid-cols-[1.2fr_1fr] gap-6">
                <div>
                  <FieldLabel>上传图片</FieldLabel>
                  <input type="file" accept="image/*" onChange={handleImageSelect} className="w-full rounded-2xl border border-surface-container-high bg-white px-4 py-3" />
                  {imageError && <p className="mt-3 text-sm text-red-600">{imageError}</p>}
                  {imageInfo && (
                    <div className="mt-6 space-y-2 text-sm text-on-surface-variant">
                      <p>文件名：{imageInfo.name}</p>
                      <p>尺寸：{imageInfo.width} × {imageInfo.height}</p>
                      <p>格式：{imageInfo.type}</p>
                      <p>大小：{imageInfo.size}</p>
                    </div>
                  )}
                  <div className="flex flex-wrap gap-3 mt-6">
                    <button type="button" onClick={() => handleConvertImage("image/png")} className="px-5 py-3 rounded-2xl bg-primary text-white font-semibold" disabled={!imageInfo}>转为 PNG</button>
                    <button type="button" onClick={() => handleConvertImage("image/jpeg")} className="px-5 py-3 rounded-2xl bg-surface-container-high text-on-surface font-semibold" disabled={!imageInfo}>转为 JPG</button>
                  </div>
                </div>
                <div className="bg-surface rounded-[1.75rem] p-5 min-h-80 flex items-center justify-center overflow-hidden">
                  {imageUrl ? <img src={imageUrl} alt="图片预览" className="max-h-72 rounded-2xl object-contain" /> : <p className="text-on-surface-variant text-sm">上传图片后在这里预览</p>}
                </div>
              </div>
            </Panel>
          )}

          {selectedCategory === "online" && (
            <Panel title="在线工具" description="先放时间戳转换，后面还能继续补 UUID、颜色转换、随机生成器等开发工具。">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <FieldLabel>时间戳转日期</FieldLabel>
                  <input value={timestampInput} onChange={(event) => setTimestampInput(event.target.value)} className="w-full rounded-2xl border border-surface-container-high bg-white px-4 py-3" />
                  <p className="mt-3 text-sm text-on-surface-variant">{timestampSummary}</p>
                </div>
                <div>
                  <FieldLabel>日期转时间戳</FieldLabel>
                  <input value={dateInput} onChange={(event) => setDateInput(event.target.value)} type="datetime-local" className="w-full rounded-2xl border border-surface-container-high bg-white px-4 py-3" />
                  <p className="mt-3 text-sm text-on-surface-variant">{dateToTimestampSummary}</p>
                </div>
              </div>
            </Panel>
          )}
        </div>

        <div className="mt-10 p-6 rounded-[1.75rem] bg-primary text-white editorial-shadow">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">下一步可以继续加真实工具</h3>
              <p className="text-white/80 leading-relaxed">
                现在已经有可用的基础工具框架了。如果你要继续扩，我建议下一批优先做 JSON 转 TypeScript、JWT 解析、颜色转换、图片压缩、Markdown 预览和真正的短链服务端。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
