"use client";
import React, { useState } from "react";

interface JsonData {
  mb: number;
  fee: number;
}

export default function Home() {
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [jsonResult, setJsonResult] = useState<JsonData[] | null>(null);
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
    } catch {
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
    <div className="oriental-container">
      <div className="oriental-decoration top-left"></div>
      <div className="oriental-decoration bottom-right"></div>

      {/* Cherry Blossom Petals */}
      <div className="cherry-petals-container">
        <div className="cherry-petal"></div>
        <div className="cherry-petal"></div>
        <div className="cherry-petal"></div>
        <div className="cherry-petal"></div>
        <div className="cherry-petal"></div>
        <div className="cherry-petal"></div>
        <div className="cherry-petal"></div>
        <div className="cherry-petal"></div>
        <div className="cherry-petal"></div>
        <div className="cherry-petal"></div>
        <div className="cherry-petal"></div>
        <div className="cherry-petal"></div>
        <div className="cherry-petal"></div>
        <div className="cherry-petal"></div>
        <div className="cherry-petal"></div>
        <div className="cherry-petal"></div>
        <div className="cherry-petal"></div>
        <div className="cherry-petal"></div>
      </div>

      <div className="oriental-header">
        <h1 className="oriental-title">Saionara Helper</h1>
        <p className="oriental-subtitle">Conversor CSV para JSON - v01</p>
      </div>

      <div className="oriental-card">
        <form onSubmit={handleSubmit} className="oriental-form">
          <div className="oriental-input-group">
            <input
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className="oriental-file-input"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="oriental-button"
          >
            {loading ? (
              <div className="oriental-loading">
                <div className="oriental-spinner"></div>
                Convertendo...
              </div>
            ) : (
              "Converter"
            )}
          </button>
        </form>

        {error && (
          <div className="oriental-error">
            {error}
          </div>
        )}

        {jsonResult && (
          <div className="oriental-result">
            <h2>Resultado (JSON)</h2>
            <pre className="oriental-json-display">
              {JSON.stringify(jsonResult, null, 2)}
            </pre>
            <button
              onClick={handleDownload}
              className="oriental-button oriental-download-btn"
            >
              Baixar JSON
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
