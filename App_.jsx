import React, { useEffect, useMemo, useRef, useState } from "react";
import Tesseract from "tesseract.js";

const teams = [
  {
    "code": "CAN",
    "flagCode": "ca",
    "name": "Canadá"
  },
  {
    "code": "MEX",
    "flagCode": "mx",
    "name": "México"
  },
  {
    "code": "USA",
    "flagCode": "us",
    "name": "Estados Unidos"
  },
  {
    "code": "JPN",
    "flagCode": "jp",
    "name": "Japão"
  },
  {
    "code": "NZL",
    "flagCode": "nz",
    "name": "Nova Zelândia"
  },
  {
    "code": "IRN",
    "flagCode": "ir",
    "name": "Irã"
  },
  {
    "code": "ARG",
    "flagCode": "ar",
    "name": "Argentina"
  },
  {
    "code": "UZB",
    "flagCode": "uz",
    "name": "Uzbequistão"
  },
  {
    "code": "KOR",
    "flagCode": "kr",
    "name": "Coreia do Sul"
  },
  {
    "code": "JOR",
    "flagCode": "jo",
    "name": "Jordânia"
  },
  {
    "code": "AUS",
    "flagCode": "au",
    "name": "Austrália"
  },
  {
    "code": "BRA",
    "flagCode": "br",
    "name": "Brasil"
  },
  {
    "code": "ECU",
    "flagCode": "ec",
    "name": "Equador"
  },
  {
    "code": "URU",
    "flagCode": "uy",
    "name": "Uruguai"
  },
  {
    "code": "COL",
    "flagCode": "co",
    "name": "Colômbia"
  },
  {
    "code": "PAR",
    "flagCode": "py",
    "name": "Paraguai"
  },
  {
    "code": "MAR",
    "flagCode": "ma",
    "name": "Marrocos"
  },
  {
    "code": "TUN",
    "flagCode": "tn",
    "name": "Tunísia"
  },
  {
    "code": "EGY",
    "flagCode": "eg",
    "name": "Egito"
  },
  {
    "code": "ALG",
    "flagCode": "dz",
    "name": "Argélia"
  },
  {
    "code": "GHA",
    "flagCode": "gh",
    "name": "Gana"
  },
  {
    "code": "CPV",
    "flagCode": "cv",
    "name": "Cabo Verde"
  },
  {
    "code": "RSA",
    "flagCode": "za",
    "name": "África do Sul"
  },
  {
    "code": "SEN",
    "flagCode": "sn",
    "name": "Senegal"
  },
  {
    "code": "CIV",
    "flagCode": "ci",
    "name": "Costa do Marfim"
  },
  {
    "code": "QAT",
    "flagCode": "qa",
    "name": "Catar"
  },
  {
    "code": "KSA",
    "flagCode": "sa",
    "name": "Arábia Saudita"
  },
  {
    "code": "IRQ",
    "flagCode": "iq",
    "name": "Iraque"
  },
  {
    "code": "BEL",
    "flagCode": "be",
    "name": "Bélgica"
  },
  {
    "code": "SUI",
    "flagCode": "ch",
    "name": "Suíça"
  },
  {
    "code": "BIH",
    "flagCode": "ba",
    "name": "Bósnia e Herzegovina"
  },
  {
    "code": "CZE",
    "flagCode": "cz",
    "name": "Tchéquia"
  },
  {
    "code": "TUR",
    "flagCode": "tr",
    "name": "Turquia"
  },
  {
    "code": "NOR",
    "flagCode": "no",
    "name": "Noruega"
  },
  {
    "code": "GER",
    "flagCode": "de",
    "name": "Alemanha"
  },
  {
    "code": "NED",
    "flagCode": "nl",
    "name": "Holanda"
  },
  {
    "code": "CRO",
    "flagCode": "hr",
    "name": "Croácia"
  },
  {
    "code": "ENG",
    "flagCode": "gb-eng",
    "name": "Inglaterra"
  },
  {
    "code": "FRA",
    "flagCode": "fr",
    "name": "França"
  },
  {
    "code": "POR",
    "flagCode": "pt",
    "name": "Portugal"
  },
  {
    "code": "ESP",
    "flagCode": "es",
    "name": "Espanha"
  },
  {
    "code": "SCO",
    "flagCode": "gb-sct",
    "name": "Escócia"
  },
  {
    "code": "AUT",
    "flagCode": "at",
    "name": "Áustria"
  },
  {
    "code": "SWE",
    "flagCode": "se",
    "name": "Suécia"
  },
  {
    "code": "COD",
    "flagCode": "cd",
    "name": "RD Congo"
  },
  {
    "code": "HAI",
    "flagCode": "ht",
    "name": "Haiti"
  },
  {
    "code": "CUW",
    "flagCode": "cw",
    "name": "Curaçao"
  },
  {
    "code": "PAN",
    "flagCode": "pa",
    "name": "Panamá"
  }
];
const stickersPerTeam = 20;

const teamAlbumBase = teams.flatMap((team) =>
  Array.from({ length: stickersPerTeam }, (_, index) => ({
    code: `${team.code} ${index + 1}`,
    teamCode: team.code,
    teamName: team.name,
    flagCode: team.flagCode,
    type: "TEAM"
  }))
);

const cocaColaBase = Array.from({ length: 14 }, (_, index) => ({
  code: `CC ${index + 1}`,
  teamCode: "CC",
  teamName: "Coca-Cola",
  flagCode: "",
  type: "CC"
}));

const fwcBase = Array.from({ length: 53 }, (_, index) => ({
  code: `FWC ${index + 1}`,
  teamCode: "FWC",
  teamName: "FWC · FIFA World Cup",
  flagCode: "",
  type: "FWC"
}));

const albumBase = [...teamAlbumBase, ...cocaColaBase, ...fwcBase];

function flagUrl(flagCode) {
  return `https://flagcdn.com/w40/${flagCode}.png`;
}

export default function App() {
  const [stickers, setStickers] = useState(() => {
    const saved = localStorage.getItem("figurinhas-copa-arthur-scan-dialog");
    return saved ? JSON.parse(saved) : {};
  });

  const [code, setCode] = useState("");
  const [search, setSearch] = useState("");
  const [teamFilter, setTeamFilter] = useState("ALL");
  const [message, setMessage] = useState("Base pronta: seleções + Coca-Cola + FWC. Ex.: BRA 1, CC 1 ou FWC 1.");
  const [showConfirmClear, setShowConfirmClear] = useState(false);
  const [pendingSticker, setPendingSticker] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const [scanCode, setScanCode] = useState("");
  const [cameraError, setCameraError] = useState("");
  const [showSettings, setShowSettings] = useState(false);
  const [backupText, setBackupText] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("figurinhas-copa-arthur-scan-dialog", JSON.stringify(stickers));
  }, [stickers]);

  useEffect(() => {
    if (!showCamera) return;

    async function startCamera() {
      try {
        setCameraError("");
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: { ideal: "environment" } },
          audio: false
        });

        streamRef.current = stream;

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }
      } catch (error) {
        setCameraError("Não consegui acessar a câmera. Verifique a permissão do navegador.");
      }
    }

    startCamera();

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
    };
  }, [showCamera]);

  const stats = useMemo(() => {
    const owned = Object.values(stickers).filter((qtd) => qtd > 0).length;
    const repeated = Object.values(stickers).reduce((acc, qtd) => acc + Math.max(qtd - 1, 0), 0);
    return { owned, repeated, missing: albumBase.length - owned, total: albumBase.length };
  }, [stickers]);

  const overallPercent = stats.total > 0 ? Math.round((stats.owned / stats.total) * 1000) / 10 : 0;

  const normalize = (value) => {
    const cleaned = String(value || "")
      .trim()
      .toUpperCase()
      .replace(/-/g, " ")
      .replace(/\s+/g, " ");

    const compact = cleaned.replace(/\s+/g, "");

    // Aceita: ARG2, Arg 02, ARG-002, BRA20, CC1, FWC53
    const compactMatch = compact.match(/^([A-Z]{2,3})(0*\d{1,3})$/);
    if (compactMatch) return `${compactMatch[1]} ${Number(compactMatch[2])}`;

    const spacedMatch = cleaned.match(/^([A-Z]{2,3})\s*0*(\d{1,3})$/);
    if (spacedMatch) return `${spacedMatch[1]} ${Number(spacedMatch[2])}`;

    return cleaned;
  };

  const normalizeForSearch = (value) => normalize(value).replace(/\s+/g, " ").trim();
  const compactSearch = (value) => normalizeForSearch(value).replace(/\s+/g, "");

  function matchesSearchTerm(item, query) {
    const raw = String(query || "").trim();
    const q = normalizeForSearch(raw);
    const qCompact = compactSearch(raw);

    if (!q) return true;

    const code = normalizeForSearch(item.code);
    const codeCompact = compactSearch(item.code);
    const teamCode = item.teamCode.toUpperCase();
    const teamName = item.teamName.toUpperCase();
    const numberOnly = code.replace(teamCode, "").trim();

    return (
      code.includes(q) ||
      codeCompact.includes(qCompact) ||
      teamCode.includes(q) ||
      teamName.includes(q) ||
      numberOnly === q ||
      numberOnly === qCompact
    );
  }

  function findSticker(input) {
    const finalCode = normalize(input);
    return albumBase.find((item) => item.code === finalCode);
  }

  function requestAddSticker(input = code, origin = "manual") {
    const finalCode = normalize(input);

    if (!finalCode) {
      setMessage("Informe um código. Exemplo: BRA 1, CC 1 ou FWC 1");
      return;
    }

    const sticker = findSticker(finalCode);
    if (!sticker) {
      setMessage(`${finalCode} não existe na base.`);
      return;
    }

    const currentQty = stickers[finalCode] || 0;
    setPendingSticker({ ...sticker, currentQty, origin });
    setCode("");
  }

  function confirmAddSticker() {
    if (!pendingSticker) return;

    const finalCode = pendingSticker.code;
    const currentQty = stickers[finalCode] || 0;

    setStickers((current) => ({
      ...current,
      [finalCode]: (current[finalCode] || 0) + 1
    }));

    if (currentQty === 0) {
      setMessage(`${finalCode} adicionada ao álbum!`);
    } else {
      setMessage(`${finalCode} marcada como repetida. Total: ${currentQty + 1}.`);
    }

    setPendingSticker(null);
  }

  function removeSticker(item) {
    setStickers((current) => {
      const qtd = current[item] || 0;
      const next = { ...current };
      if (qtd <= 1) delete next[item];
      else next[item] = qtd - 1;
      return next;
    });
    setMessage(`${item} atualizada.`);
  }

  function confirmClear() {
    setStickers({});
    setShowConfirmClear(false);
    setMessage("Coleção reiniciada.");
  }

  function openCamera() {
    setScanCode("");
    setCameraError("");
    setShowCamera(true);
  }

  function closeCamera() {
    setShowCamera(false);
    setScanCode("");
    setCameraError("");
  }

  function confirmCameraCode() {
    const finalCode = normalize(scanCode);

    if (!finalCode) {
      setCameraError("Digite o código visto na figurinha. Exemplo: SUI 17, CC 1 ou FWC 1");
      return;
    }

    const sticker = findSticker(finalCode);

    if (!sticker) {
      setCameraError(`${finalCode} não existe na base.`);
      return;
    }

    setShowCamera(false);
    setPendingSticker({
      ...sticker,
      currentQty: stickers[finalCode] || 0,
      origin: "scanner"
    });
    setScanCode("");
  }

  function extractStickerCodeFromOCR(text) {
    const normalizedText = String(text || "")
      .toUpperCase()
      .replace(/[\n\r]+/g, " ")
      .replace(/[-_]/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    // Procura padrões como BRA 2, BRA2, ARG 02, FWC 53, CC 1 etc.
    const candidates = normalizedText.match(/\b[A-Z]{2,3}\s*0*\d{1,3}\b/g) || [];

    for (const candidate of candidates) {
      const finalCode = normalize(candidate);
      if (findSticker(finalCode)) return finalCode;
    }

    return "";
  }

  async function handleOCRImage(event) {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file) return;

    try {
      setIsScanning(true);
      setMessage("Lendo a figurinha pela câmera...");

      const result = await Tesseract.recognize(file, "eng", {
        logger: () => {}
      });

      const detectedCode = extractStickerCodeFromOCR(result?.data?.text || "");

      if (!detectedCode) {
        setMessage("Não consegui identificar o código. Tente tirar a foto mais perto do código ou digite manualmente.");
        return;
      }

      const sticker = findSticker(detectedCode);

      if (!sticker) {
        setMessage(`${detectedCode} foi lido, mas não existe na base.`);
        return;
      }

      setPendingSticker({
        ...sticker,
        currentQty: stickers[detectedCode] || 0,
        origin: "scanner"
      });

      setMessage(`Scanner encontrou: ${detectedCode}`);
    } catch (error) {
      setMessage("Erro ao ler a imagem. Tente novamente ou digite o código manualmente.");
    } finally {
      setIsScanning(false);
    }
  }

  function simulateScan() {
    fileInputRef.current?.click();
  }

  function goToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function goToSection(sectionId) {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  async function copyBackup() {
    const data = JSON.stringify(stickers, null, 2);
    try {
      await navigator.clipboard?.writeText(data);
      setMessage("Backup copiado para a área de transferência.");
    } catch (error) {
      setMessage("Não consegui copiar automaticamente. Tente pelo navegador do celular/computador.");
    }
    setShowSettings(false);
  }

  const filteredAlbum = albumBase.filter((item) => {
    const matchesSearch = matchesSearchTerm(item, search);
    const matchesTeam = teamFilter === "ALL" || item.teamCode === teamFilter;
    return matchesSearch && matchesTeam;
  });

  const missingList = albumBase.filter((item) => !stickers[item.code]);

  const filteredMissingList = missingList.filter((item) => {
    const matchesTeam = teamFilter === "ALL" || item.teamCode === teamFilter;
    return matchesTeam;
  });

  function copyMissingList() {
    const text = filteredMissingList.map((item) => item.code).join(", ");
    if (!text) {
      setMessage("Nenhuma figurinha faltando neste filtro.");
      return;
    }

    navigator.clipboard?.writeText(`Figurinhas que faltam: ${text}`);
    setMessage("Lista de faltantes copiada.");
  }

  function parseBackupText(text) {
    let raw = text.trim();

    if (!raw) {
      throw new Error("Backup vazio");
    }

    raw = raw
      .replace(/[“”]/g, '\"')
      .replace(/[‘’]/g, "'")
      .replace(/```json|```/gi, "")
      .trim();

    const firstBrace = raw.indexOf("{");
    const lastBrace = raw.lastIndexOf("}");

    if (firstBrace >= 0 && lastBrace > firstBrace) {
      raw = raw.slice(firstBrace, lastBrace + 1);
    } else if (!raw.startsWith("{")) {
      raw = `{${raw}}`;
    }

    raw = raw.replace(/,\s*([}\]])/g, "$1");

    return JSON.parse(raw);
  }

  function importBackup() {
    try {
      const parsed = parseBackupText(backupText);
      if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
        throw new Error("Formato inválido");
      }

      const cleanBackup = {};
      Object.entries(parsed).forEach(([itemCode, qtd]) => {
        const normalizedCode = normalize(String(itemCode));
        if (findSticker(normalizedCode)) {
          const quantity = Number(qtd);
          if (Number.isFinite(quantity) && quantity > 0) {
            cleanBackup[normalizedCode] = Math.floor(quantity);
          }
        }
      });

      const totalRestored = Object.keys(cleanBackup).length;
      if (totalRestored === 0) {
        throw new Error("Nenhuma figurinha válida encontrada");
      }

      setStickers(cleanBackup);
      setBackupText("");
      setShowSettings(false);
      setMessage(`Backup restaurado com sucesso: ${totalRestored} figurinha(s) carregada(s).`);
    } catch (error) {
      setMessage("Não consegui restaurar o backup. Cole o backup completo copiado pelo botão, com as chaves { }.");
      setShowSettings(false);
    }
  }

  const repeatedList = Object.entries(stickers)
    .filter(([, qtd]) => qtd > 1)
    .map(([code, qtd]) => {
      const item = albumBase.find((sticker) => sticker.code === code);
      return { code, qtd, flagCode: item?.flagCode || "", teamName: item?.teamName || "", teamCode: item?.teamCode || "" };
    });

  const selectedTeamProgress = useMemo(() => {
    if (teamFilter === "ALL") return null;
    const teamItems = albumBase.filter((item) => item.teamCode === teamFilter);
    const owned = teamItems.filter((item) => stickers[item.code]).length;
    const repeated = teamItems.reduce((acc, item) => acc + Math.max((stickers[item.code] || 0) - 1, 0), 0);
    const realTeam = teams.find((item) => item.code === teamFilter);
    const firstItem = teamItems[0];
    const team = realTeam || {
      code: firstItem?.teamCode || teamFilter,
      flagCode: firstItem?.flagCode || "",
      name: firstItem?.teamName || teamFilter
    };
    return { team, owned, repeated, total: teamItems.length };
  }, [teamFilter, stickers]);

  const teamProgressList = useMemo(() => {
    return teams.map((team) => {
      const teamItems = albumBase.filter((item) => item.teamCode === team.code);
      const owned = teamItems.filter((item) => stickers[item.code]).length;
      const repeated = teamItems.reduce((acc, item) => acc + Math.max((stickers[item.code] || 0) - 1, 0), 0);
      const missing = teamItems.length - owned;
      const percent = Math.round((owned / teamItems.length) * 100);
      return { ...team, owned, repeated, missing, total: teamItems.length, percent };
    }).sort((a, b) => b.percent - a.percent || a.name.localeCompare(b.name));
  }, [stickers]);

  return (
    <div className="page">
      <div className="fieldLines"></div>
      <div className="app">
        <header className="hero">
          <div className="heroBadge">
            <div className="cup">🏆</div>
            <strong>2026</strong>
          </div>

          <div className="heroText">
            <p>CONTROLE RÁPIDO</p>
            <h1>Figurinhas da Copa 2026 <span className="miniCup">🏆</span></h1>
            <h2>Álbum do Arthur</h2>
            <span>Desenvolvido por Genilson Loiola 😎</span>
          </div>

          <div className="heroFacts">
            <div><b>🗓️</b><span>Copa do Mundo</span><strong>2026</strong></div>
            <div><b>📍</b><span>Sede</span><strong>EUA · Canadá · México</strong></div>
            <div><b>👥</b><span>48 Seleções</span><strong>+ CC e FWC</strong></div>
          </div>
        </header>

        <section className="stats">
          <Card icon="✓" label="TENHO" value={`${stats.owned}/${stats.total}`} sublabel={`${overallPercent}% do álbum`} kind="ok" />
          <Card icon="↻" label="REPETIDAS" value={stats.repeated} sublabel="Para trocar" kind="repeat" />
          <Card icon="×" label="FALTAM" value={stats.missing} sublabel={`${Math.round((stats.missing / stats.total) * 1000) / 10}% do álbum`} kind="missing" />
        </section>

        <section className="panel addPanel">
          <div className="addIcon">📷</div>
          <div className="addText">
            <h3>Adicionar figurinha</h3>
            <p>Digite o código ou escaneie a figurinha</p>
            <small>{message}</small>
          </div>
          <div className="addControls">
            <div className="inputRow">
              <input value={code} onChange={(e) => setCode(e.target.value)} onKeyDown={(e) => e.key === "Enter" && requestAddSticker()} placeholder="Ex: BRA-1, CC-1 ou FWC-1" />
              <button onClick={() => requestAddSticker()}>+</button>
            </div>
            <span>ou</span>
            <button className="scan" onClick={simulateScan} disabled={isScanning}>
              {isScanning ? "🔎 Lendo figurinha..." : "📷 Escanear figurinha"}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleOCRImage}
              style={{ display: "none" }}
            />
          </div>
        </section>

        <section className="lists">
          <TradePanel repeated={repeatedList} onRemove={removeSticker} onAdd={requestAddSticker} />
          <ProgressPanel teams={teamProgressList} />
        </section>

        <nav className="bottomNav" aria-label="Navegação principal">
          <button type="button" className="active" onClick={goToTop}>🏠 <span>Início</span></button>
          <button type="button" onClick={() => goToSection("album-section")}>▦ <span>Álbum</span></button>
          <button type="button" onClick={() => goToSection("missing-section")}>❌ <span>Faltam</span></button>
          <button type="button" onClick={simulateScan}>⌗ <span>Escanear</span></button>
          <button type="button" onClick={() => goToSection("stats-section")}>◔ <span>Estatísticas</span></button>
          <button type="button" onClick={() => setShowSettings(true)}>⚙️ <span>Configurações</span></button>
        </nav>

        <section id="album-section" className="panel albumPanel">
          <div className="albumHeader">
            <div>
              <h2>Álbum</h2>
              <p>{teams.length} seleções · {stickersPerTeam} figurinhas por seleção · CC 1-14 · FWC 1-53</p>
            </div>
            <button className="clear" onClick={() => setShowConfirmClear(true)}>🗑️ Limpar</button>
          </div>


          <div className="albumProgressCard">
            <div className="albumProgressTop">
              <div>
                <strong>Progresso geral</strong>
                <span>{stats.owned} de {stats.total} figurinhas</span>
              </div>
              <b>{overallPercent}%</b>
            </div>

            <div className="albumProgressBar">
              <div style={{ width: `${overallPercent}%` }}></div>
            </div>

            <div className="albumProgressFooter">
              <span>✅ {stats.owned} tenho</span>
              <span>🔁 {stats.repeated} repetidas</span>
              <span>❌ {stats.missing} faltam</span>
            </div>
          </div>

          <select className="teamSelect" value={teamFilter} onChange={(e) => setTeamFilter(e.target.value)}>
            <option value="ALL">🌎 Tudo</option>
            <option value="CC">🥤 Coca-Cola</option>
            <option value="FWC">🏆 FWC</option>
            {teams.map((team) => <option key={team.code} value={team.code}>{team.name}</option>)}
          </select>

          {selectedTeamProgress && (
            <div className="teamProgress">
              <strong><Flag flagCode={selectedTeamProgress.team.flagCode} code={selectedTeamProgress.team.code} /> {selectedTeamProgress.team.name}</strong>
              <span>{selectedTeamProgress.owned}/{selectedTeamProgress.total} · rep. {selectedTeamProgress.repeated}</span>
            </div>
          )}

          <input className="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar por país ou código" />

          <div className="legend">
            <span><b className="dot ok">✓</b> Tenho</span>
            <span><b className="dot repeat">↻</b> Repetida</span>
            <span><b className="dot no">×</b> Não tenho</span>
          </div>

          {!search.trim() && (
          <section id="missing-section" className="missingPanel">
            <div className="missingHeader">
              <div>
                <h3>❌ Figurinhas que faltam</h3>
                <p>Veja exatamente quais códigos faltam para fechar o álbum ou a seleção selecionada no filtro acima.</p>
              </div>
              <button type="button" onClick={copyMissingList}>📋 Copiar lista</button>
            </div>

            <div className="missingSummary">
              <strong>{filteredMissingList.length}</strong>
              <span>{teamFilter === "ALL" ? "faltando no álbum" : "faltando nesta seleção"}</span>
            </div>

            {filteredMissingList.length === 0 ? (
              <div className="emptyMissing">✅ Nada faltando neste filtro.</div>
            ) : (
              <div className="missingGrid">
                {filteredMissingList.map((item) => (
                  <button type="button" className="missingChip" key={item.code} onClick={() => requestAddSticker(item.code)}>
                    <Flag flagCode={item.flagCode} code={item.teamCode} />
                    <span>
                      <strong>{item.code}</strong>
                      <small>{item.teamName}</small>
                    </span>
                  </button>
                ))}
              </div>
            )}
          </section>
          )}

          <div className="albumList">
            {filteredAlbum.map((item) => {
              const qtd = stickers[item.code] || 0;
              const status = qtd === 0 ? "no" : qtd === 1 ? "ok" : "repeat";
              const statusText = qtd === 0 ? "Não tenho" : qtd === 1 ? "Tenho" : `Repetida +${qtd - 1}`;
              const statusIcon = qtd === 0 ? "×" : qtd === 1 ? "✓" : "↻";

              return (
                <div className={`albumItem ${status}`} key={item.code}>
                  <div className="stickerMain">
                    <Flag flagCode={item.flagCode} code={item.teamCode} />
                    <div>
                      <strong>{item.code}</strong>
                      <p>{item.teamName}</p>
                    </div>
                  </div>

                  <div className="statusBox">
                    <span className={`statusIcon ${status}`}>{statusIcon}</span>
                    <small>{statusText}</small>
                  </div>

                  <div className="itemActions">
                    <button onClick={() => removeSticker(item.code)}>-</button>
                    <button onClick={() => requestAddSticker(item.code)}>+</button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>


      {showCamera && (
        <div className="modalBackdrop" role="dialog" aria-modal="true">
          <div className="modal cameraModal">
            <button className="modalClose" onClick={closeCamera}>×</button>
            <div className="cameraTitle">📷 Escanear figurinha</div>
            <p>Aponte a câmera para o código da figurinha. Por enquanto, confirme digitando o código que aparecer no verso.</p>

            <div className="cameraFrame">
              {cameraError ? (
                <div className="cameraError">{cameraError}</div>
              ) : (
                <video ref={videoRef} playsInline muted />
              )}
            </div>

            <input
              className="scanInput"
              value={scanCode}
              onChange={(e) => setScanCode(e.target.value)}
              placeholder="Ex: SUI 17, CC 1 ou FWC 1"
              onKeyDown={(e) => e.key === "Enter" && confirmCameraCode()}
            />

            <div className="modalActions">
              <button className="cancelBtn" onClick={closeCamera}>Cancelar</button>
              <button className="successBtn" onClick={confirmCameraCode}>Validar código</button>
            </div>
          </div>
        </div>
      )}

      {showSettings && (
        <div className="modalBackdrop" role="dialog" aria-modal="true">
          <div className="modal settingsModal">
            <button className="modalClose" onClick={() => setShowSettings(false)}>×</button>
            <h2>Configurações</h2>
            <p>Área rápida para backup e manutenção do álbum do Arthur.</p>

            <div className="settingsList">
              <button type="button" onClick={copyBackup}>
                <strong>📋 Copiar backup</strong>
                <span>Copia os dados salvos deste navegador.</span>
              </button>

              <div className="backupImport">
                <label>Restaurar backup</label>
                <textarea
                  value={backupText}
                  onChange={(e) => setBackupText(e.target.value)}
                  placeholder='Cole aqui o backup copiado. Ex: {"BRA 1":1}'
                />
                <button type="button" onClick={importBackup} disabled={!backupText.trim()}>Restaurar backup</button>
              </div>

              <button
                type="button"
                className="dangerSetting"
                onClick={() => {
                  setShowSettings(false);
                  setShowConfirmClear(true);
                }}
              >
                <strong>🗑️ Limpar álbum</strong>
                <span>Remove todas as figurinhas salvas.</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {showConfirmClear && (
        <div className="modalBackdrop" role="dialog" aria-modal="true">
          <div className="modal">
            <button className="modalClose" onClick={() => setShowConfirmClear(false)}>×</button>
            <div className="warningIcon">⚠️</div>
            <h2>Limpar todas as figurinhas?</h2>
            <p>Essa ação vai remover todos os registros de “Tenho” e “Repetidas”. Não poderá ser desfeita.</p>
            <div className="modalActions">
              <button className="cancelBtn" onClick={() => setShowConfirmClear(false)}>Cancelar</button>
              <button className="dangerBtn" onClick={confirmClear}>Limpar tudo</button>
            </div>
          </div>
        </div>
      )}

      {pendingSticker && (
        <div className="modalBackdrop" role="dialog" aria-modal="true">
          <div className="modal stickerModal">
            <button className="modalClose" onClick={() => setPendingSticker(null)}>×</button>
            <Flag flagCode={pendingSticker.flagCode} code={pendingSticker.teamCode} large />
            <h2>{pendingSticker.currentQty === 0 ? "Oba, você ainda não tem!" : "Putz, você já tem essa!"}</h2>
            <p>
              {pendingSticker.origin === "scanner" ? "Scanner identificou: " : "Figurinha selecionada: "}
              <strong>{pendingSticker.code}</strong> · {pendingSticker.teamName}
            </p>
            <p>
              {pendingSticker.currentQty === 0
                ? "Deseja adicionar essa figurinha ao álbum?"
                : `Você já possui ${pendingSticker.currentQty}. Deseja marcar como repetida?`}
            </p>
            <div className="modalActions">
              <button className="cancelBtn" onClick={() => setPendingSticker(null)}>Cancelar</button>
              <button className={pendingSticker.currentQty === 0 ? "successBtn" : "repeatBtn"} onClick={confirmAddSticker}>
                {pendingSticker.currentQty === 0 ? "Adicionar ao álbum" : "Marcar repetida"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Flag({ flagCode, code, large = false }) {
  const isSpecial = code === "CC" || code === "FWC" || !flagCode;
  const icon = code === "CC" ? "🥤" : code === "FWC" ? "🏆" : "";

  return (
    <span className={`${large ? "flagIcon large" : "flagIcon"} ${isSpecial ? "special" : ""}`}>
      {isSpecial ? (
        <span className="specialBadgeInner">{icon || "⭐"}</span>
      ) : (
        <img src={flagUrl(flagCode)} alt={code} onError={(e) => { e.currentTarget.style.display = "none"; }} />
      )}
      <small>{code}</small>
    </span>
  );
}

function TradePanel({ repeated, onRemove, onAdd }) {
  const totalRepeated = repeated.reduce((acc, item) => acc + Math.max(item.qtd - 1, 0), 0);
  const tradeText = repeated.map((item) => `${item.code} (+${item.qtd - 1})`).join(", ");

  function copyTradeList() {
    if (!tradeText) return;
    navigator.clipboard?.writeText(`Minhas repetidas: ${tradeText}`);
  }

  return (
    <div className="panel tradePanel">
      <div className="tradeHeader">
        <div>
          <h3><span>🔁</span>Central de trocas</h3>
          <p>{totalRepeated} repetida(s) para negociar</p>
        </div>
        <button onClick={copyTradeList} disabled={repeated.length === 0}>Copiar</button>
      </div>

      {repeated.length === 0 ? (
        <div className="emptyTrade">
          <strong>Nenhuma repetida ainda</strong>
          <span>Quando aparecer repetida, ela entra aqui para troca.</span>
        </div>
      ) : (
        <div className="tradeList">
          {repeated.map((item) => (
            <div className="tradeItem" key={item.code}>
              <div className="tradeSticker">
                <Flag flagCode={item.flagCode} code={item.teamCode} />
                <div>
                  <strong>{item.code}</strong>
                  <p>{item.teamName}</p>
                </div>
              </div>

              <div className="tradeCount">+{item.qtd - 1}</div>

              <div className="tradeActions">
                <button onClick={() => onRemove(item.code)}>-</button>
                <button onClick={() => onAdd(item.code)}>+</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ProgressPanel({ teams }) {
  return (
    <div id="stats-section" className="panel progressPanel">
      <h3><span>📊</span>Progresso por seleção</h3>
      <div className="progressList">
        {teams.map((team) => (
          <div className="progressItem" key={team.code}>
            <div className="progressHeader">
              <strong><Flag flagCode={team.flagCode} code={team.code} /> {team.name}</strong>
              <span>{team.owned}/{team.total}</span>
            </div>
            <div className="bar">
              <div style={{ width: `${team.percent}%` }}></div>
            </div>
            <small>Faltam {team.missing} · Rep. {team.repeated}</small>
          </div>
        ))}
      </div>
    </div>
  );
}

function Card({ icon, label, value, sublabel, kind }) {
  return (
    <div className={`card ${kind}`}>
      <div className="cardIcon">{icon}</div>
      <div>
        <p>{label}</p>
        <strong>{value}</strong>
        {sublabel && <span>{sublabel}</span>}
      </div>
    </div>
  );
}

function MiniList({ icon, title, items, empty, footer }) {
  return (
    <div className="panel mini">
      <h3><span>{icon}</span>{title}</h3>
      {items.length === 0 ? <p className="muted">{empty}</p> : items.map((item) => <p className="pill" key={item}>{item}</p>)}
      {footer && <p className="footer">{footer}</p>}
    </div>
  );
}

// teste git pae