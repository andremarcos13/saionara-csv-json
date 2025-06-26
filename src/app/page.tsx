"use client";
import React, { useState } from "react";

export default function Home() {
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [jsonResult, setJsonResult] = useState<any[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setJsonResult(null);
    if (e.target.files && e.target.files[0]) {
      setCsvFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setJsonResult(null);
    if (!csvFile) {
      setError("Selecione um arquivo CSV.");
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("file", csvFile);
    try {
      const res = await fetch("/api/csv-to-json", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Erro ao converter o arquivo.");
      } else {
        setJsonResult(data);
      }
    } catch (err) {
      setError("Erro ao enviar o arquivo.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!jsonResult || !csvFile) return;

    // Pega o nome do arquivo CSV e troca a extensão para .json
    const csvFileName = csvFile.name;
    const jsonFileName = csvFileName.replace(/\.csv$/i, '.json');

    const blob = new Blob([JSON.stringify(jsonResult, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = jsonFileName;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main style={{ maxWidth: 600, margin: "40px auto", padding: 24 }}>
      <h1>Saionara</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: 24 }}>
        <input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          style={{ marginBottom: 12 }}
        />
        <br />
        <button type="submit" disabled={loading} style={{ padding: "8px 24px" }}>
          {loading ? "Convertendo..." : "Converter"}
        </button>
      </form>
      {error && <div style={{ color: "red", marginBottom: 16 }}>{error}</div>}
      {jsonResult && (
        <>
          <h2>Resultado (JSON)</h2>
          <pre style={{ background: "black", padding: 12, borderRadius: 6, maxHeight: 300, overflow: "auto" }}>
            {JSON.stringify(jsonResult, null, 2)}
          </pre>
          <button onClick={handleDownload} style={{ marginTop: 12, padding: "8px 24px" }}>
            Baixar JSON
          </button>
        </>
      )}
      {/* <div style={{ marginTop: 32, color: '#555', fontSize: 14 }}>
        <b>Formato esperado do CSV:</b>
        <pre style={{ background: '#f9f9f9', padding: 8, borderRadius: 4 }}>
          mb;fee
          0,00%;0,00%
          0,10%;0,00%
          0,20%;0,00%
        </pre>
        <div>O JSON gerado terá os valores convertidos para decimal.</div>
      </div> */}
    </main>
  );
}
