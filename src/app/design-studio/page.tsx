"use client";

import React, { useState, useRef, useEffect } from "react";
import { FaUpload, FaFont, FaSave, FaShoppingCart, FaUndo, FaRedo } from "react-icons/fa";
import { PiTextAaBold } from "react-icons/pi";
import { MdPalette } from "react-icons/md";
import { IoLogoDeviantart } from "react-icons/io5";
import { BsImageFill } from "react-icons/bs";
import { Button, Input, Select, SelectItem, Slider, Tabs, Tab, Divider, Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/react";
import frontShirt from "../../assets/images/tshirt-front-alt.png";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { FaList, FaX, FaXmark } from "react-icons/fa6";
import logo from "../../../public/logo.png";
import Image from "next/image";
import Link from "next/link";

import soccer from "@/assets/clip-art/soccer.png"
import basketball from "@/assets/clip-art/basketball.png"
import baseball from "@/assets/clip-art/baseball.png"
import bowling from "@/assets/clip-art/bowling.png"

import lion from "@/assets/clip-art/lion.png"
import dog from "@/assets/clip-art/dog.png"
import eagle from "@/assets/clip-art/eagle.png"
import wolf from "@/assets/clip-art/wolf.png"

import heart from "@/assets/clip-art/heart.png"
import moon from "@/assets/clip-art/moon.png"
import fire from "@/assets/clip-art/fire.png"
import star from "@/assets/clip-art/star.png"

import flowers from "@/assets/clip-art/flower.png"
import trees from "@/assets/clip-art/trees.png"
import cave from "@/assets/clip-art/cave.png"
import birds from "@/assets/clip-art/birds.png"
import { Gem, Sparkles } from "lucide-react";

// Type definitions
type Position = {
  x: number;
  y: number;
};

type TextElement = {
  id: string;
  type: 'text';
  value: string;
  font: string;
  size: number;
  color: string;
  bold: boolean;
  italic: boolean;
  underline: boolean;
  position: Position;
  rotation: number;
  scale: number;
};

type ImageElement = {
  id: string;
  type: 'image' | 'clipart';
  src: string;
  name?: string;
  position: Position;
  rotation: number | number[];
  scale: number | number[];
};

type DesignElement = TextElement | ImageElement;

type Product = {
  id: string;
  name: string;
  basePrice: number;
};

type ColorOption = {
  value: string;
  label: string;
};

type FontOption = {
  value: string;
  label: string;
};

type ClipArtCategory = {
  key: string;
  label: string;
};

type ClipArtItem = {
  id: string;
  name: string;
  src: string;
};

type DesignState = {
  textElements: TextElement[];
  imageElements: ImageElement[];
  selectedColor: string;
  selectedProduct: string;
};

const DesignStudio = () => {
  // State management for design elements
  const [activeTab, setActiveTab] = useState<string>("color");
  const [selectedColor, setSelectedColor] = useState<string>("#FFFFFF");
  const [selectedProduct, setSelectedProduct] = useState<string>("tshirt");
  const [productView, setProductView] = useState<string>("front");
  const [size, setSize] = useState<string>("m");
  const [quantity, setQuantity] = useState<number>(1);
  const [textElements, setTextElements] = useState<TextElement[]>([]);
  const [imageElements, setImageElements] = useState<ImageElement[]>([]);
  const [activeElement, setActiveElement] = useState<string | null>(null);
  const [history, setHistory] = useState<DesignState[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedClipArtCategory, setSelectedClipArtCategory] = React.useState("sports");
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [designs, setDesigns] = useState<Record<string, DesignState>>({});
  const [currentDesignName, setCurrentDesignName] = useState<string>("");
  const [showSaveDialog, setShowSaveDialog] = useState<boolean>(false);
  const [showLoadDialog, setShowLoadDialog] = useState<boolean>(false);

  // Mock data for product options
  const products: Product[] = [
    { id: "tshirt", name: "T-Shirt", basePrice: 19.99 },
    { id: "hoodie", name: "Hoodie", basePrice: 39.99 },
    { id: "sweatshirt", name: "Sweatshirt", basePrice: 29.99 },
  ];

  const sizes: string[] = ["xs", "s", "m", "l", "xl", "xxl"];

  const fontOptions: FontOption[] = [
    { value: "Arial", label: "Arial" },
    { value: "Helvetica", label: "Helvetica" },
    { value: "Times New Roman", label: "Times New Roman" },
    { value: "Courier New", label: "Courier New" },
    { value: "Georgia", label: "Georgia" },
  ];

  const colorOptions: ColorOption[] = [
    { value: "#FFFFFF", label: "White" },
    { value: "#000000", label: "Black" },
    { value: "#FF0000", label: "Red" },
    { value: "#0000FF", label: "Blue" },
    { value: "#FFFF00", label: "Yellow" },
    { value: "#008000", label: "Green" },
    { value: "#800080", label: "Purple" },
    { value: "#FFA500", label: "Orange" },
    { value: "#808080", label: "Gray" },
  ];

  const clipArtCategories: ClipArtCategory[] = [
    { key: "sports", label: "Sports" },
    { key: "animals", label: "Animals" },
    { key: "symbols", label: "Symbols" },
    { key: "nature", label: "Nature" },
  ];

  // Mock clipart for each category
  const clipArtItems: Record<string, ClipArtItem[]> = {
    sports: [
      { id: "football", name: "Football", src: soccer.src },
      { id: "basketball", name: "Basketball", src: basketball.src },
      { id: "baseball", name: "Baseball", src: baseball.src },
      { id: "bowling", name: "Bowling", src: bowling.src },
    ],
    animals: [
      { id: "lion", name: "Lion", src: lion.src },
      { id: "eagle", name: "Eagle", src: eagle.src },
      { id: "wolf", name: "Wolf", src: wolf.src },
      { id: "dog", name: "Dog", src: dog.src },
    ],
    symbols: [
      { id: "star", name: "Star", src: star.src },
      { id: "heart", name: "Heart", src: heart.src },
      { id: "moon", name: "moon", src: moon.src },
      { id: "fire", name: "Fire", src: fire.src },
    ],
    nature: [
      { id: "tree", name: "Tree", src: trees.src },
      { id: "cave", name: "Cave", src: cave.src },
      { id: "bird", name: "Bird chirping", src: birds.src },
      { id: "flower", name: "Fower", src: flowers.src },
    ],
  };


  const saveDesign = (name: string) => {
    const designToSave: DesignState = {
      textElements,
      imageElements,
      selectedColor,
      selectedProduct,
    };

    // Save to local state
    const updatedDesigns = { ...designs, [name]: designToSave };
    setDesigns(updatedDesigns);
    setCurrentDesignName(name);

    // Save to localStorage
    localStorage.setItem('savedDesigns', JSON.stringify(updatedDesigns));
    setShowSaveDialog(false);
  };

  const loadDesign = (name: string) => {
    const designToLoad = designs[name];
    if (designToLoad) {
      setTextElements(designToLoad.textElements);
      setImageElements(designToLoad.imageElements);
      setSelectedColor(designToLoad.selectedColor);
      setSelectedProduct(designToLoad.selectedProduct);
      setCurrentDesignName(name);
      setActiveElement(null);

      // Add current state to history
      saveToHistory();
    }
    setShowLoadDialog(false);
  };

  // Load saved designs from localStorage on component mount
  useEffect(() => {
    const savedDesigns = localStorage.getItem('savedDesigns');
    if (savedDesigns) {
      try {
        const parsedDesigns = JSON.parse(savedDesigns);
        setDesigns(parsedDesigns);
      } catch (error) {
        console.error('Error loading saved designs:', error);
      }
    }
  }, []);

  // Function to add new text element
  const addTextElement = () => {
    const newText: TextElement = {
      id: `text-${Date.now()}`,
      type: "text",
      value: "Your Text Here",
      font: "Arial",
      size: 24,
      color: "#000000",
      bold: false,
      italic: false,
      underline: false,
      position: { x: 150, y: 150 },
      rotation: 0,
      scale: 1,
    };

    setTextElements([...textElements, newText]);
    setActiveElement(newText.id);
    saveToHistory();
  };

  // Function to handle text update
  const updateTextElement = (id: string, changes: Partial<TextElement>) => {
    const updated = textElements.map(element =>
      element.id === id ? { ...element, ...changes } : element
    );
    setTextElements(updated);
  };

  // Function to handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const newImage: ImageElement = {
            id: `image-${Date.now()}`,
            type: "image",
            src: event.target.result as string,
            position: { x: 150, y: 150 },
            rotation: 0,
            scale: 1,
          };
          setImageElements([...imageElements, newImage]);
          setActiveElement(newImage.id);
          saveToHistory();
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Function to add clipart
  const addClipart = (clipart: ClipArtItem) => {
    const newImage: ImageElement = {
      id: `clipart-${Date.now()}`,
      type: "clipart",
      src: clipart.src,
      name: clipart.name,
      position: { x: 150, y: 150 },
      rotation: 0,
      scale: 1,
    };
    setImageElements([...imageElements, newImage]);
    setActiveElement(newImage.id);
    saveToHistory();
  };

  // Function to save current state to history
  const saveToHistory = () => {
    const currentState: DesignState = {
      textElements: [...textElements],
      imageElements: [...imageElements],
      selectedColor,
      selectedProduct,
    };

    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(currentState);

    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  // Undo function
  const handleUndo = () => {
    if (historyIndex > 0) {
      const prevState = history[historyIndex - 1];
      setTextElements(prevState.textElements);
      setImageElements(prevState.imageElements);
      setSelectedColor(prevState.selectedColor);
      setSelectedProduct(prevState.selectedProduct);
      setHistoryIndex(historyIndex - 1);
    }
  };

  // Redo function
  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const nextState = history[historyIndex + 1];
      setTextElements(nextState.textElements);
      setImageElements(nextState.imageElements);
      setSelectedColor(nextState.selectedColor);
      setSelectedProduct(nextState.selectedProduct);
      setHistoryIndex(historyIndex + 1);
    }
  };

  // Function to handle product color change
  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    saveToHistory();
  };

  // Get active element data
  const getActiveElementData = (): DesignElement | null => {
    const activeTextElement = textElements.find(el => el.id === activeElement);
    if (activeTextElement) return activeTextElement;

    const activeImageElement = imageElements.find(el => el.id === activeElement);
    if (activeImageElement) return activeImageElement;

    return null;
  };

  const activeElementData = getActiveElementData();

  // Calculate total price
  const calculatePrice = (): number => {
    const baseProduct = products.find(p => p.id === selectedProduct);
    let price = baseProduct ? baseProduct.basePrice : 0;

    // Add costs for customizations
    price += textElements.length * 2.50;  // $2.50 per text element
    price += imageElements.length * 3.75; // $3.75 per image/clipart

    return price * quantity;
  };

  const handleMouseDown = (e: React.MouseEvent, elementId: string) => {
    e.stopPropagation(); // Prevent event bubbling

    setActiveElement(elementId);
    setIsDragging(true);

    // Calculate offset from cursor position to element corner
    const element = e.currentTarget.getBoundingClientRect();
    const offsetX = e.clientX - element.left;
    const offsetY = e.clientY - element.top;

    setDragOffset({ x: offsetX, y: offsetY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !activeElement) return;

    // Get the canvas container position
    const canvas = e.currentTarget.getBoundingClientRect();

    // Calculate new position inside the canvas
    const newX = e.clientX - canvas.left - dragOffset.x;
    const newY = e.clientY - canvas.top - dragOffset.y;

    // Keep elements within canvas bounds (optional)
    const x = Math.max(0, Math.min(newX, canvas.width));
    const y = Math.max(0, Math.min(newY, canvas.height));

    // Update the position based on element type
    const isTextElement = textElements.some(el => el.id === activeElement);
    if (isTextElement) {
      const updated = textElements.map(el =>
        el.id === activeElement ? { ...el, position: { x, y } } : el
      );
      setTextElements(updated);
    } else {
      const updated = imageElements.map(el =>
        el.id === activeElement ? { ...el, position: { x, y } } : el
      );
      setImageElements(
        updated.map((element) => ({
          ...element,
          rotation: Array.isArray(element.rotation) ? element.rotation[0] : element.rotation,
        }))
      );
    }
  };

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
      saveToHistory(); // Save the new position to history
    }
  };

  const exportDesign = async (quality = 1) => {
    // Create a canvas element
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions (higher for better quality)
    const scale = 2; // 2x resolution for high quality
    canvas.width = 1200 * scale;
    canvas.height = 1600 * scale;

    // Draw the product base (white or selected color)
    ctx.fillStyle = selectedColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw all design elements
    for (const element of [...textElements, ...imageElements]) {
      if (element.type === 'text') {
        // Draw text elements
        ctx.save();
        ctx.translate(element.position.x * scale, element.position.y * scale);
        ctx.rotate((element.rotation * Math.PI) / 180);
        ctx.scale(element.scale, element.scale);

        ctx.font = `${element.bold ? 'bold ' : ''}${element.size * scale}px ${element.font}`;
        ctx.fillStyle = element.color;
        ctx.fillText(element.value, 0, 0);
        ctx.restore();
      } else {
        // Draw image elements
        const img = document.createElement('img');
        img.src = element.src;

        await new Promise((resolve) => {
          img.onload = () => {
            ctx.save();
            ctx.translate(element.position.x * scale, element.position.y * scale);
            ctx.rotate((Number(element.rotation) * Math.PI) / 180);
            ctx.scale(Number(element.scale), Number(element.scale));

            ctx.drawImage(
              img,
              -img.width / 2,
              -img.height / 2,
              img.width * scale,
              img.height * scale
            );
            ctx.restore();
            resolve(true);
          };
        });
      }
    }

    // Convert to downloadable image
    const link = document.createElement('a');
    link.download = 'my-design.png';
    link.href = canvas.toDataURL('image/png', quality);
    link.click();
  };

  // Active tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case "color":
        return (
          <div className="p-5">
            <h6 className="font-bold text-xl mb-6">Choose a Product Color</h6>
            <div className="grid grid-cols-6 gap-2">
              {colorOptions.map((color) => (
                <Button
                  key={color.value}
                  className={`!w-full !min-w-0 h-12 rounded-lg border-2 ${selectedColor === color.value ? "border-primary" : "border-gray-200"
                    }`}
                  style={{ backgroundColor: color.value }}
                  onClick={() => handleColorChange(color.value)}
                  aria-label={color.label}
                />
              ))}
            </div>
          </div>
        );

      case "text":
        return (
          <div className="p-5">
            <div className="flex justify-between items-center mb-6">
              <h6 className="font-bold text-xl">Add & Edit Text</h6>
              <Button color="primary" className="text-white" size="sm" onClick={addTextElement}>Add Text</Button>
            </div>

            {activeElementData && activeElementData.type === "text" ? (
              <div className="space-y-4">
                <Input
                  label="Text Content"
                  value={activeElementData.value}
                  onChange={(e) => updateTextElement(activeElementData.id, { value: e.target.value })}
                  fullWidth
                />

                <Select
                  label="Font Family"
                  selectedKeys={[activeElementData.font]}
                  onChange={(e) => updateTextElement(activeElementData.id, { font: e.target.value })}
                >
                  {fontOptions.map((font) => (
                    <SelectItem key={font.value}>
                      {font.label}
                    </SelectItem>
                  ))}
                </Select>

                <div>
                  <label className="block text-sm mb-2">Font Size</label>
                  <Slider
                    color="primary"
                    size="sm"
                    step={1}
                    minValue={10}
                    maxValue={72}
                    value={activeElementData.size}
                    onChange={(value) => {
                      const sizeValue = Array.isArray(value) ? value[0] : value;
                      updateTextElement(activeElementData.id, { size: sizeValue });
                    }}
                    className="max-w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-2">Text Color</label>
                  <div className="grid grid-cols-8 gap-2">
                    {colorOptions.map((color) => (
                      <button
                        key={color.value}
                        className={`w-6 h-6 rounded-full border ${activeElementData.color === color.value ? "border-blue-500 ring-2 ring-blue-300" : "border-gray-300"
                          }`}
                        style={{ backgroundColor: color.value }}
                        onClick={() => updateTextElement(activeElementData.id, { color: color.value })}
                        aria-label={color.label}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <h6 className="font-medium text-base">Text Style</h6>
                  <div className="flex space-x-2">
                    <Button
                      isIconOnly
                      size="sm"
                      variant={activeElementData.bold ? "solid" : "bordered"}
                      onClick={() => updateTextElement(activeElementData.id, { bold: !activeElementData.bold })}
                    >
                      B
                    </Button>
                    <Button
                      isIconOnly
                      size="sm"
                      variant={activeElementData.italic ? "solid" : "bordered"}
                      onClick={() => updateTextElement(activeElementData.id, { italic: !activeElementData.italic })}
                    >
                      I
                    </Button>
                    <Button
                      isIconOnly
                      size="sm"
                      variant={activeElementData.underline ? "solid" : "bordered"}
                      onClick={() => updateTextElement(activeElementData.id, { underline: !activeElementData.underline })}
                    >
                      U
                    </Button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm mb-2">Rotation</label>
                  <Slider
                    size="sm"
                    step={1}
                    minValue={0}
                    maxValue={359}
                    value={activeElementData.rotation}
                    onChange={(value) => {
                      const rotationValue = Array.isArray(value) ? value[0] : value;
                      updateTextElement(activeElementData.id, { rotation: rotationValue });
                    }}
                    className="max-w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-2">Scale</label>
                  <Slider
                    size="sm"
                    step={0.1}
                    minValue={0.5}
                    maxValue={3}
                    value={activeElementData.scale}
                    onChange={(value) => updateTextElement(activeElementData.id, { scale: value as number })}
                    className="max-w-full"
                  />
                </div>
              </div>
            ) : (
              <div className="text-center py-10 text-gray-500">
                <FaFont className="mx-auto text-4xl mb-3" />
                <p>Select a text element to edit or add a new one</p>
              </div>
            )}
          </div>
        );

      case "upload":
        return (
          <div className="p-5">
            <h6 className="font-bold text-xl mb-6">Upload Images</h6>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-6">
              <BsImageFill className="mx-auto text-3xl text-gray-400 mb-3" />
              <p className="text-gray-500 mb-4">Upload your own images to add to your design</p>
              <Button
                color="primary"
                variant="bordered"
                onClick={() => fileInputRef.current?.click()}
              >
                <FaUpload className="mr-2" />
                Select File
              </Button>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileUpload}
              />
            </div>

            {activeElementData && (activeElementData.type === "image" || activeElementData.type === "clipart") && (
              <div className="space-y-4 mt-5">
                <h6 className="font-medium text-lg">Adjust Image</h6>

                <div>
                  <label className="block text-sm mb-2">Rotation</label>
                  <Slider
                    size="sm"
                    step={1}
                    minValue={0}
                    maxValue={359}
                    value={activeElementData.rotation}
                    onChange={(value) => {
                      const updated = imageElements.map(element =>
                        element.id === activeElementData.id ? { ...element, rotation: value } : element
                      );
                      setImageElements(updated);
                    }}
                    className="max-w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-2">Scale</label>
                  <Slider
                    size="sm"
                    step={0.1}
                    minValue={0.5}
                    maxValue={3}
                    value={activeElementData.scale}
                    onChange={(value) => {
                      const updated = imageElements.map(element =>
                        element.id === activeElementData.id ? { ...element, scale: value } : element
                      );
                      setImageElements(updated);
                    }}
                    className="max-w-full h-4"
                  />
                </div>
              </div>
            )}
          </div>
        );

      case "art":
        return (
          <div className="p-5">
            <h6 className="font-bold text-xl mb-6">Add Clipart</h6>

            <Select
              label="Select Category"
              placeholder="Choose a category"
              selectedKeys={[selectedClipArtCategory]}
              onChange={(e) => setSelectedClipArtCategory(e.target.value)}
              className="mb-4"
            >
              {clipArtCategories.map((category) => (
                <SelectItem key={category.key}>
                  {category.label}
                </SelectItem>
              ))}
            </Select>

            <div className="grid grid-cols-2 gap-3">
              {clipArtItems[selectedClipArtCategory]?.slice(0, 6).map((item) => (
                <button
                  key={item.id}
                  className="border border-gray-200 rounded-lg p-2 hover:border-blue-500 transition"
                  onClick={() => addClipart(item)}
                >
                  <img
                    src={item.src}
                    alt={item.name}
                    className="w-full h-24 object-contain"
                  />
                  <p className="text-sm text-center mt-1">{item.name}</p>
                </button>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const SaveDesignDialog = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h6 className="font-bold text-xl mb-4">Save Design</h6>
        <Input
          label="Design Name"
          placeholder="Enter a name for your design"
          value={currentDesignName}
          onChange={(e) => setCurrentDesignName(e.target.value)}
          fullWidth
          autoFocus
        />
        <div className="flex justify-end space-x-3 mt-6">
          <Button variant="bordered" onClick={() => setShowSaveDialog(false)}>
            Cancel
          </Button>
          <Button
            color="primary"
            className="text-white"
            disabled={!currentDesignName.trim()}
            onClick={() => saveDesign(currentDesignName.trim())}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );

  // Add this JSX for the load dialog
  const LoadDesignDialog = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h6 className="font-bold text-xl mb-4">Load Design</h6>
        {Object.keys(designs).length > 0 ? (
          <div className="max-h-64 overflow-y-auto">
            {Object.keys(designs).map((name) => (
              <div
                key={name}
                className="p-3 border border-gray-200 rounded-md mb-2 cursor-pointer hover:bg-gray-50"
                onClick={() => loadDesign(name)}
              >
                <div className="font-medium">{name}</div>
                <div className="text-xs text-gray-500">
                  {designs[name].textElements.length} text elements,
                  {designs[name].imageElements.length} image elements
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 py-4 text-center">No saved designs found.</p>
        )}
        <div className="flex justify-end mt-6">
          <Button variant="bordered" onClick={() => setShowLoadDialog(false)}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Navbar maxWidth="full" shouldHideOnScroll className="py-4">
        <NavbarBrand>
          <Link href="/">
            <Image src={logo} className="w-[120px] h-auto" alt="100md Tees" />
          </Link>
        </NavbarBrand>

        <NavbarContent justify="end" className="font-outfit">
          <NavbarItem>
            <Button color="primary" variant="light" startContent={<FaSave />} onClick={() => setShowSaveDialog(true)} className="mr-2">
              Save Design
            </Button>

            <Button
              variant="bordered"
              size="sm"
              startContent={<FaList />}
              onClick={() => setShowLoadDialog(true)}
            >
              Load Existing
            </Button>
          </NavbarItem>
          <Divider orientation="vertical" />
          <Button color="primary" className="text-white" variant="solid" startContent={<Sparkles />}>
            {/* Add to Cart */}
            Mint Design
          </Button>
        </NavbarContent>
      </Navbar>
      <div className="w-full min-h-screen bg-gray-100">
        <main className="container mx-auto py-8">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Design toolbar */}
            <div className="w-full lg:w-1/4 flex flex-col gap-4">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <Tabs
                  aria-label="Design Options"
                  color="primary"
                  variant="solid"
                  fullWidth
                  selectedKey={activeTab}
                  onSelectionChange={(key) => setActiveTab(key as string)}
                  classNames={{
                    tabList: "gap-0 w-full relative rounded-none p-0 border-b border-divider",
                    cursor: "w-full rounded-none",
                    tab: "flex-1 px-0 font-medium text-sm h-12",
                    tabContent: "group-data-[selected=true]:text-white",
                  }}
                >
                  <Tab
                    key="color"
                    title={
                      <div className="flex items-center justify-center space-x-1">
                        <MdPalette />
                        <span>Color</span>
                      </div>
                    }
                  />
                  <Tab
                    key="upload"
                    title={
                      <div className="flex items-center justify-center space-x-1">
                        <FaUpload />
                        <span>Upload</span>
                      </div>
                    }
                  />
                  <Tab
                    key="text"
                    title={
                      <div className="flex items-center justify-center space-x-1">
                        <PiTextAaBold />
                        <span>Text</span>
                      </div>
                    }
                  />
                  <Tab
                    key="art"
                    title={
                      <div className="flex items-center justify-center space-x-1">
                        <IoLogoDeviantart />
                        <span>Art</span>
                      </div>
                    }
                  />
                </Tabs>

                {renderTabContent()}
              </div>

              {/* Layers panel */}
              <div className="bg-white rounded-lg shadow-lg p-5">
                <div className="flex justify-between items-center mb-4">
                  <h6 className="font-bold text-lg">Design Layers</h6>
                  <div className="flex space-x-2">
                    <Button isIconOnly size="sm" variant="light" onClick={handleUndo}>
                      <FaUndo />
                    </Button>
                    <Button isIconOnly size="sm" variant="light" onClick={handleRedo}>
                      <FaRedo />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {textElements.map((element) => (
                    <div
                      key={element.id}
                      className={`p-3 border rounded-md cursor-pointer flex justify-between items-center ${activeElement === element.id ? "border-blue-500 bg-blue-50" : "border-gray-200"
                        }`}
                      onClick={() => setActiveElement(element.id)}
                    >
                      <div className="flex items-center">
                        <FaFont className="mr-2 text-gray-600" />
                        <span className="text-sm truncate max-w-40">{element.value}</span>
                      </div>
                      <Button
                        isIconOnly
                        size="sm"
                        variant="light"
                        color="danger"
                        onClick={(e) => {
                          e.stopPropagation();
                          setTextElements(textElements.filter(t => t.id !== element.id));
                          if (activeElement === element.id) setActiveElement(null);
                          saveToHistory();
                        }}
                      >
                        <FaXmark />
                      </Button>
                    </div>
                  ))}

                  {imageElements.map((element) => (
                    <div
                      key={element.id}
                      className={`p-3 border rounded-md cursor-pointer flex justify-between items-center ${activeElement === element.id ? "border-blue-500 bg-blue-50" : "border-gray-200"
                        }`}
                      onClick={() => setActiveElement(element.id)}
                    >
                      <div className="flex items-center">
                        <BsImageFill className="mr-2 text-gray-600" />
                        <span className="text-sm truncate max-w-40">
                          {element.type === "clipart" ? element.name : "Image"}
                        </span>
                      </div>
                      <Button
                        isIconOnly
                        size="sm"
                        variant="light"
                        color="danger"
                        onClick={(e) => {
                          e.stopPropagation();
                          setImageElements(imageElements.filter(img => img.id !== element.id));
                          if (activeElement === element.id) setActiveElement(null);
                          saveToHistory();
                        }}
                      >
                        <FaXmark />
                      </Button>
                    </div>
                  ))}

                  {textElements.length === 0 && imageElements.length === 0 && (
                    <p className="text-gray-500 text-sm text-center py-4">
                      No elements yet. Add text or images to your design.
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Design preview */}
            <div className="w-full lg:w-1/2">
              <div className="bg-white rounded-lg shadow-lg p-5">
                <div className="flex justify-between items-center mb-4">
                  <h6 className="font-bold text-lg">Design Preview</h6>
                  <div className="flex space-x-2">
                    <Button variant="bordered" onClick={() => setProductView(productView === "front" ? "back" : "front")}>
                      {productView === "front" ? "View Back" : "View Front"}
                    </Button>
                  </div>
                </div>

                <div className="relative w-full aspect-[3/4] border border-gray-200 rounded-lg overflow-hidden bg-white"
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img
                      src={frontShirt.src}
                      alt={`${selectedProduct} ${productView} view`}
                      className="w-full object-contain"
                      style={{
                        filter: `drop-shadow(0 0 0 ${selectedColor})`,
                        backgroundColor: selectedColor,
                        mixBlendMode: 'multiply'
                      }}
                    />

                    {/* Render text elements */}
                    {textElements.map((element) => (
                      <div
                        key={element.id}
                        className={`absolute cursor-move ${activeElement === element.id ? "ring-2 ring-blue-500" : ""}`}
                        style={{
                          left: `${element.position.x}px`,
                          top: `${element.position.y}px`,
                          transform: `rotate(${element.rotation}deg) scale(${element.scale})`,
                          fontFamily: element.font,
                          fontSize: `${element.size}px`,
                          color: element.color,
                          fontWeight: element.bold ? "bold" : "normal",
                          fontStyle: element.italic ? "italic" : "normal",
                          textDecoration: element.underline ? "underline" : "none",
                        }}
                        onMouseDown={(e) => handleMouseDown(e, element.id)}
                      // onClick={() => setActiveElement(element.id)}
                      >
                        {element.value}
                      </div>
                    ))}

                    {/* Render image elements */}
                    {imageElements.map((element) => (
                      <div
                        key={element.id}
                        className={`absolute cursor-move ${activeElement === element.id ? "ring-2 ring-blue-500" : ""}`}
                        style={{
                          left: `${element.position.x}px`,
                          top: `${element.position.y}px`,
                          transform: `rotate(${element.rotation}deg) scale(${element.scale})`,
                          width: "100px",
                          height: "100px",
                        }}
                        onMouseDown={(e) => handleMouseDown(e, element.id)}
                      // onClick={() => setActiveElement(element.id)}
                      >
                        <img
                          src={element.src}
                          alt={element.type === "clipart" ? element.name : "Uploaded image"}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Product details and options */}
            <div className="w-full lg:w-1/4">
              <div className="bg-white rounded-lg shadow-lg p-5">
                <h6 className="font-bold text-lg mb-4">Product Options</h6>

                <div className="space-y-4 relative">
                  <Select
                    label="Product Type"
                    placeholder="Select a product type"
                    selectedKeys={[selectedProduct]}
                    onChange={(e) => setSelectedProduct(e.target.value)}
                  >
                    {products.map((product) => (
                      <SelectItem key={product.id}>
                        {product.name}
                      </SelectItem>
                    ))}
                  </Select>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Size
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {sizes.map((sizeOption) => (
                        <Button
                          key={sizeOption}
                          size="sm"
                          variant={size === sizeOption ? "solid" : "bordered"}
                          color={size === sizeOption ? "primary" : "default"}
                          onClick={() => setSize(sizeOption)}
                          className={`min-w-12 ${size === sizeOption ? "text-white" : ""}`}
                        >
                          {sizeOption.toUpperCase()}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Quantity
                    </label>
                    <div className="flex items-center">
                      <Button
                        isIconOnly
                        size="sm"
                        variant="bordered"
                        onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                      >
                        -
                      </Button>
                      <span className="mx-4 font-medium">{quantity}</span>
                      <Button
                        isIconOnly
                        size="sm"
                        variant="bordered"
                        onClick={() => setQuantity(quantity + 1)}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="mt-8 border-t pt-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-700">Price:</span>
                    <span className="text-xl font-bold">${calculatePrice().toFixed(2)}</span>
                  </div>

                  <Button
                    color="primary"
                    size="lg"
                    className="w-full text-white"

                    startContent={<Sparkles />}
                  >
                    {/* Add to Cart */}
                    Mint Design
                  </Button>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-5 mt-6">
                <h6 className="font-bold text-lg mb-4">Design Summary</h6>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Product:</span>
                    <span className="font-medium">
                      {products.find(p => p.id === selectedProduct)?.name || "T-Shirt"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Color:</span>
                    <span className="font-medium">
                      {colorOptions.find(c => c.value === selectedColor)?.label || "White"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Size:</span>
                    <span className="font-medium">{size.toUpperCase()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Elements:</span>
                    <span className="font-medium">{textElements.length + imageElements.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Quantity:</span>
                    <span className="font-medium">{quantity}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {showSaveDialog && <SaveDesignDialog />}
        {showLoadDialog && <LoadDesignDialog />}

        <footer className="bg-gray-200 text-white py-6 mt-8">
          <div className="container mx-auto px-4">
            <img src={logo.src} className="w-[100px] h-auto mx-auto" />
            <div className="border-t border-gray-300 mt-6 pt-6 text-center text-gray-500 text-sm">
              © {new Date().getFullYear()} Design Studio Pro. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default DesignStudio;