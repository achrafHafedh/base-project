// @ts-nocheck
"use client";
import React, { useRef, useState, useEffect } from "react";
import { fabric } from "fabric";

const ColorList = ({ removeColor }: any) => {
  const colors = [
    { name: "Noir", value: "#000000" },
    { name: "Blanc", value: "#ffffff" },
  ];

  const [isVisible, setIsVisible] = useState(false);

  const toggleListVisibility = () => {
    setIsVisible(!isVisible);
  };

  const removeBackgroundColor = (color) => {
    setIsVisible(false);
    removeColor(color);
  };

  return (
    <div>
      <button onClick={toggleListVisibility}>
        {isVisible
          ? "Masquer la liste des couleurs"
          : "Afficher la liste des couleurs"}
      </button>

      {isVisible && (
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {colors.map((color, index) => (
            <li
              onClick={() => removeBackgroundColor(color.value)}
              key={index}
              style={{
                display: "inline-flex",
                alignItems: "center",
                marginBottom: "8px",
              }}
            >
              <div
                style={{
                  width: "30px",
                  height: "30px",
                  backgroundColor: color.value,
                  marginRight: "10px",
                  borderRadius: "4px",
                  border: "1px solid black",
                }}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default function Editor() {
  const canvasRef = useRef(null); // Référence du canevas
  const fileInputRef = useRef(null); // Référence du champ de fichier
  const [canvas, setCanvas] = useState(null); // State pour le canevas

  useEffect(() => {
    // Initialiser le canevas Fabric.js une fois le composant monté
    if (!canvasRef.current) return;
    const fabricCanvas = new fabric.Canvas(canvasRef.current, {
      width: 800,
      height: 600,
      backgroundColor: "#f0f0f0",
    });
    setCanvas(fabricCanvas);

    // Nettoyer le canevas lorsque le composant est démonté
    return () => {
      fabricCanvas.dispose();
    };
  }, []);

  // Fonction pour gérer l'upload de l'image
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const imgElement = new Image();
      imgElement.src = e.target.result;
      imgElement.onload = () => {
        const img = new fabric.Image(imgElement, {
          left: 100, // Position horizontale
          top: 100, // Position verticale
        });
        canvas.add(img); // Ajouter l'image au canevas
      };
    };
    reader.readAsDataURL(file); // Lire l'image comme URL de données
  };

  const addText = () => {
    const text = new fabric.Textbox("Enter text here", {
      left: 100,
      top: 100,
      fontSize: 24,
      fontFamily: "Arial",
      fill: "#000",
    });
    canvas.add(text);
    canvas.renderAll();
  };

  const handleFontSizeChange = (event) => {
    const activeObject = canvas.getActiveObject();
    if (activeObject && activeObject.type === "textbox") {
      activeObject.set("fontSize", parseInt(event.target.value, 10));
      canvas.renderAll();
    }
  };

  const handleFontChange = (event) => {
    const activeObject = canvas.getActiveObject();
    if (activeObject && activeObject.type === "textbox") {
      activeObject.set("fontFamily", event.target.value);
      canvas.renderAll();
    }
  };

  const handleDeleteKey = () => {
    const activeObject = canvas.getActiveObject();
    if (activeObject) {
      canvas.remove(activeObject);
      canvas.renderAll();
    }
  };

  const chooseTshirt = () => {
    const imgElement = document.createElement("img");
    imgElement.src = "./images/back-front.jpg"; // Path to your white shirt image

    imgElement.onload = () => {
      const imgInstance = new fabric.Image(imgElement);
      imgInstance.scaleToWidth(800);
      imgInstance.hasControls = false;
      imgInstance.selectable = false;
      canvas.add(imgInstance);
      canvas.renderAll();
    };
  };

  const removeImageBackground = (color) => {
    const activeObject = canvas.getActiveObject();
    if (activeObject && activeObject.type === "image") {
      activeObject.filters.push(
        new fabric.Image.filters.RemoveColor({
          color: color, // Assumes white background
          distance: 0.1, // Adjust to tolerate slight color variations
        })
      );
      activeObject.applyFilters();
      canvas.renderAll();
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Uploader une Image avec Fabric.js</h1>

      <button onClick={addText}>Add Text</button>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept="image/*"
        style={{ marginBottom: "20px" }}
      />
      <label>
        Font Size:
        <input
          type="number"
          min="10"
          max="100"
          onChange={handleFontSizeChange}
        />
      </label>
      <label>
        Font:
        <select onChange={handleFontChange}>
          <option value="Arial">Arial</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Courier New">Courier New</option>
        </select>
      </label>
      <button onClick={chooseTshirt}>Add Tshirt</button>
      <ColorList removeColor={removeImageBackground} />
      <button onClick={handleDeleteKey}>Delete</button>

      {/* Canevas Fabric.js */}
      <canvas
        ref={canvasRef}
        style={{ border: "1px solid #000", marginTop: "20px" }}
      />
    </div>
  );
}
