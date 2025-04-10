"use client";

import React, { useState, useRef, useEffect } from "react";
import fabric from "fabric";
import { FabricJSCanvas, useFabricJSEditor } from 'fabricjs-react'
import { FaUpload, FaFont, FaLayerGroup, FaSave, FaShoppingCart, FaUndo, FaRedo } from "react-icons/fa";
import { PiTextAaBold } from "react-icons/pi";
import { MdPalette, MdOutlineFormatColorFill } from "react-icons/md";
import { IoLogoDeviantart } from "react-icons/io5";
import { TbRotate, TbArrowsMaximize } from "react-icons/tb";
import { BsImageFill } from "react-icons/bs";
import { Button, Input, Select, SelectItem, Slider, Tabs, Tab } from "@heroui/react";
import frontShirt from "../../../assets/images/tshirt-front-alt.png";

// Type definitions
interface Position {
    x: number;
    y: number;
}

interface TextElement {
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
}

interface ImageElement {
    id: string;
    type: 'image' | 'clipart';
    src: string;
    name?: string;
    position: Position;
    rotation: number;
    scale: number;
}

interface Product {
    id: string;
    name: string;
    basePrice: number;
}

interface DesignState {
    textElements: TextElement[];
    imageElements: ImageElement[];
    selectedColor: string;
    selectedProduct: string;
}

const DesignStudio = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const fabricCanvasRef = useRef<fabric.Canvas | null>(null);
    const [activeTab, setActiveTab] = useState("color");
    const [selectedColor, setSelectedColor] = useState("#FFFFFF");
    const [selectedProduct, setSelectedProduct] = useState("tshirt");
    const [productView, setProductView] = useState("front");
    const [size, setSize] = useState("m");
    const [quantity, setQuantity] = useState(1);
    const [textElements, setTextElements] = useState<TextElement[]>([]);
    const [imageElements, setImageElements] = useState<ImageElement[]>([]);
    const [activeElement, setActiveElement] = useState<string | null>(null);
    const [history, setHistory] = useState<DesignState[]>([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Mock data for product options
    const products: Product[] = [
        { id: "tshirt", name: "T-Shirt", basePrice: 19.99 },
        { id: "hoodie", name: "Hoodie", basePrice: 39.99 },
        { id: "sweatshirt", name: "Sweatshirt", basePrice: 29.99 },
    ];

    const sizes = ["xs", "s", "m", "l", "xl", "xxl"];

    const fontOptions = [
        { value: "Arial", label: "Arial" },
        { value: "Helvetica", label: "Helvetica" },
        { value: "Times New Roman", label: "Times New Roman" },
        { value: "Courier New", label: "Courier New" },
        { value: "Georgia", label: "Georgia" },
    ];

    const colorOptions = [
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

    const clipArtCategories = [
        { id: "sports", name: "Sports" },
        { id: "animals", name: "Animals" },
        { id: "symbols", name: "Symbols" },
        { id: "nature", name: "Nature" },
    ];

    // Initialize Fabric.js canvas
    useEffect(() => {
        if (canvasRef.current) {
            const canvas = new fabric.Canvas(canvasRef.current, {
                selection: true,
                preserveObjectStacking: true,
            });
            fabricCanvasRef.current = canvas;

            // Set canvas background
            fabric.Image.fromURL(frontShirt.src, (img) => {
                img.set({
                    originX: 'center',
                    originY: 'center',
                    left: canvas.width! / 2,
                    top: canvas.height! / 2,
                    selectable: false,
                    evented: false,
                });
                canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
            });

            // Event listeners
            canvas.on('selection:created', (e) => {
                if (e.selected && e.selected.length > 0) {
                    setActiveElement(e.selected[0].id);
                }
            });

            canvas.on('selection:updated', (e) => {
                if (e.selected && e.selected.length > 0) {
                    setActiveElement(e.selected[0].id);
                }
            });

            canvas.on('selection:cleared', () => {
                setActiveElement(null);
            });

            canvas.on('object:modified', () => {
                updateElementsFromCanvas();
            });

            return () => {
                canvas.dispose();
            };
        }
    }, []);

    // Update elements from canvas state
    const updateElementsFromCanvas = () => {
        if (!fabricCanvasRef.current) return;

        const canvas = fabricCanvasRef.current;
        const newTextElements: TextElement[] = [];
        const newImageElements: ImageElement[] = [];

        canvas.forEachObject((obj) => {
            if (obj.type === 'textbox') {
                const textObj = obj as fabric.Textbox;
                newTextElements.push({
                    id: obj.id!,
                    type: 'text',
                    value: textObj.text!,
                    font: textObj.fontFamily!,
                    size: textObj.fontSize!,
                    color: textObj.fill as string,
                    bold: !!textObj.fontWeight,
                    italic: !!textObj.fontStyle,
                    underline: !!textObj.underline,
                    position: { x: obj.left!, y: obj.top! },
                    rotation: obj.angle!,
                    scale: obj.scaleX!,
                });
            } else if (obj.type === 'image') {
                newImageElements.push({
                    id: obj.id!,
                    type: 'image',
                    src: (obj as fabric.Image).getSrc() || '',
                    position: { x: obj.left!, y: obj.top! },
                    rotation: obj.angle!,
                    scale: obj.scaleX!,
                });
            }
        });

        setTextElements(newTextElements);
        setImageElements(newImageElements);
    };

    // Sync elements to canvas
    useEffect(() => {
        if (!fabricCanvasRef.current) return;

        const canvas = fabricCanvasRef.current;
        canvas.discardActiveObject().renderAll();

        // Clear existing objects except background
        canvas.forEachObject((obj) => {
            if (obj !== canvas.backgroundImage) {
                canvas.remove(obj);
            }
        });

        // Add text elements
        textElements.forEach((element) => {
            const text = new fabric.Textbox(element.value, {
                id: element.id,
                left: element.position.x,
                top: element.position.y,
                fontFamily: element.font,
                fontSize: element.size,
                fill: element.color,
                fontWeight: element.bold ? 'bold' : 'normal',
                fontStyle: element.italic ? 'italic' : 'normal',
                underline: element.underline,
                angle: element.rotation,
                scaleX: element.scale,
                scaleY: element.scale,
                hasControls: true,
                hasBorders: true,
                lockUniScaling: true,
            });
            canvas.add(text);
        });

        // Add image elements
        imageElements.forEach((element) => {
            fabric.Image.fromURL(element.src, (img) => {
                img.set({
                    id: element.id,
                    left: element.position.x,
                    top: element.position.y,
                    angle: element.rotation,
                    scaleX: element.scale,
                    scaleY: element.scale,
                    hasControls: true,
                    hasBorders: true,
                    lockUniScaling: true,
                });
                canvas.add(img);
                canvas.renderAll();
            });
        });

        // Select active element if exists
        if (activeElement) {
            const obj = canvas.getObjects().find(o => o.id === activeElement);
            if (obj) {
                canvas.setActiveObject(obj);
                canvas.renderAll();
            }
        }
    }, [textElements, imageElements, activeElement]);

    // Function to add new text element
    const addTextElement = () => {
        if (!fabricCanvasRef.current) return;

        const canvas = fabricCanvasRef.current;
        const newText = {
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

        const text = new fabric.Textbox(newText.value, {
            id: newText.id,
            left: newText.position.x,
            top: newText.position.y,
            fontFamily: newText.font,
            fontSize: newText.size,
            fill: newText.color,
            hasControls: true,
            hasBorders: true,
            lockUniScaling: true,
        });

        canvas.add(text);
        canvas.setActiveObject(text);
        canvas.renderAll();

        setTextElements([...textElements, newText]);
        setActiveElement(newText.id);
        saveToHistory();
    };

    // Function to handle text update
    const updateTextElement = (id: string, changes: Partial<TextElement>) => {
        if (!fabricCanvasRef.current) return;

        const canvas = fabricCanvasRef.current;
        const obj = canvas.getObjects().find(o => o.id === id);

        if (obj && obj.type === 'textbox') {
            const textObj = obj as fabric.Textbox;

            if (changes.value !== undefined) textObj.set('text', changes.value);
            if (changes.font !== undefined) textObj.set('fontFamily', changes.font);
            if (changes.size !== undefined) textObj.set('fontSize', changes.size);
            if (changes.color !== undefined) textObj.set('fill', changes.color);
            if (changes.bold !== undefined) textObj.set('fontWeight', changes.bold ? 'bold' : 'normal');
            if (changes.italic !== undefined) textObj.set('fontStyle', changes.italic ? 'italic' : 'normal');
            if (changes.underline !== undefined) textObj.set('underline', changes.underline);
            if (changes.rotation !== undefined) textObj.set('angle', changes.rotation);
            if (changes.scale !== undefined) {
                textObj.set('scaleX', changes.scale);
                textObj.set('scaleY', changes.scale);
            }

            canvas.renderAll();
            updateElementsFromCanvas();
            saveToHistory();
        }
    };

    // Function to handle file upload
    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !fabricCanvasRef.current) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const newImage = {
                id: `image-${Date.now()}`,
                type: "image" as const,
                src: event.target?.result as string,
                position: { x: 150, y: 150 },
                rotation: 0,
                scale: 1,
            };

            fabric.Image.fromURL(newImage.src, (img) => {
                img.set({
                    id: newImage.id,
                    left: newImage.position.x,
                    top: newImage.position.y,
                    scaleX: newImage.scale,
                    scaleY: newImage.scale,
                    hasControls: true,
                    hasBorders: true,
                    lockUniScaling: true,
                });

                const canvas = fabricCanvasRef.current;
                if (canvas) {
                    canvas.add(img);
                    canvas.setActiveObject(img);
                    canvas.renderAll();
                }

                setImageElements([...imageElements, newImage]);
                setActiveElement(newImage.id);
                saveToHistory();
            });
        };
        reader.readAsDataURL(file);
    };

    // Function to add clipart
    const addClipart = (clipart: { id: string; name: string; src: string }) => {
        const newImage = {
            id: `clipart-${Date.now()}`,
            type: "clipart" as const,
            src: clipart.src,
            name: clipart.name,
            position: { x: 150, y: 150 },
            rotation: 0,
            scale: 1,
        };

        fabric.Image.fromURL(newImage.src, (img) => {
            img.set({
                id: newImage.id,
                left: newImage.position.x,
                top: newImage.position.y,
                scaleX: newImage.scale,
                scaleY: newImage.scale,
                hasControls: true,
                hasBorders: true,
                lockUniScaling: true,
            });

            const canvas = fabricCanvasRef.current;
            if (canvas) {
                canvas.add(img);
                canvas.setActiveObject(img);
                canvas.renderAll();
            }

            setImageElements([...imageElements, newImage]);
            setActiveElement(newImage.id);
            saveToHistory();
        });
    };

    // Function to save current state to history
    const saveToHistory = () => {
        const currentState = {
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
    const getActiveElementData = () => {
        const activeTextElement = textElements.find(el => el.id === activeElement);
        if (activeTextElement) return activeTextElement;

        const activeImageElement = imageElements.find(el => el.id === activeElement);
        if (activeImageElement) return activeImageElement;

        return null;
    };

    const activeElementData = getActiveElementData();

    // Calculate total price
    const calculatePrice = () => {
        const baseProduct = products.find(p => p.id === selectedProduct);
        let price = baseProduct ? baseProduct.basePrice : 0;

        // Add costs for customizations
        price += textElements.length * 2.50;  // $2.50 per text element
        price += imageElements.length * 3.75; // $3.75 per image/clipart

        return price * quantity;
    };

    // Active tab content
    const renderTabContent = () => {
        switch (activeTab) {
            case "color":
                return (
                    <div className="p-5">
                        <h6 className="font-bold text-xl mb-6">Choose a Product Color</h6>
                        <div className="grid grid-cols-4 gap-3">
                            {colorOptions.map((color) => (
                                <button
                                    key={color.value}
                                    className={`w-12 h-12 rounded-lg border-2 ${selectedColor === color.value ? "border-blue-500" : "border-gray-200"
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
                            <Button color="primary" size="sm" onClick={addTextElement}>Add Text</Button>
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
                                        <SelectItem key={font.value} value={font.value}>
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
                                        onChange={(value) => updateTextElement(activeElementData.id, { size: value })}
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
                                        onChange={(value) => updateTextElement(activeElementData.id, { rotation: value })}
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
                                        onChange={(value) => updateTextElement(activeElementData.id, { scale: value })}
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
                                            if (!fabricCanvasRef.current) return;
                                            const obj = fabricCanvasRef.current.getObjects().find(o => o.id === activeElementData.id);
                                            if (obj) {
                                                obj.set('angle', value);
                                                fabricCanvasRef.current.renderAll();
                                                updateElementsFromCanvas();
                                                saveToHistory();
                                            }
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
                                            if (!fabricCanvasRef.current) return;
                                            const obj = fabricCanvasRef.current.getObjects().find(o => o.id === activeElementData.id);
                                            if (obj) {
                                                obj.set('scaleX', value);
                                                obj.set('scaleY', value);
                                                fabricCanvasRef.current.renderAll();
                                                updateElementsFromCanvas();
                                                saveToHistory();
                                            }
                                        }}
                                        className="max-w-full"
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
                            className="mb-4"
                        >
                            {clipArtCategories.map((category) => (
                                <SelectItem key={category.id} value={category.id}>
                                    {category.name}
                                </SelectItem>
                            ))}
                        </Select>

                        <div className="grid grid-cols-2 gap-3">
                            {clipArtItems.sports.slice(0, 6).map((item) => (
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

    return (
        <div className="w-full min-h-screen bg-gray-100">
            <header className="bg-white shadow-sm p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-blue-600">Design Studio Pro</h1>
                    <div className="flex items-center space-x-4">
                        <Button color="primary" variant="light" startContent={<FaSave />}>
                            Save Design
                        </Button>
                        <Button color="success" variant="solid" startContent={<FaShoppingCart />}>
                            Add to Cart
                        </Button>
                    </div>
                </div>
            </header>

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
                                onSelectionChange={setActiveTab}
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
                                                if (fabricCanvasRef.current) {
                                                    const obj = fabricCanvasRef.current.getObjects().find(o => o.id === element.id);
                                                    if (obj) {
                                                        fabricCanvasRef.current.remove(obj);
                                                        fabricCanvasRef.current.renderAll();
                                                    }
                                                }
                                                setTextElements(textElements.filter(t => t.id !== element.id));
                                                if (activeElement === element.id) setActiveElement(null);
                                                saveToHistory();
                                            }}
                                        >
                                            ×
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
                                                if (fabricCanvasRef.current) {
                                                    const obj = fabricCanvasRef.current.getObjects().find(o => o.id === element.id);
                                                    if (obj) {
                                                        fabricCanvasRef.current.remove(obj);
                                                        fabricCanvasRef.current.renderAll();
                                                    }
                                                }
                                                setImageElements(imageElements.filter(img => img.id !== element.id));
                                                if (activeElement === element.id) setActiveElement(null);
                                                saveToHistory();
                                            }}
                                        >
                                            ×
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

                            <div className="relative w-full aspect-[3/4] border border-gray-200 rounded-lg overflow-hidden bg-white">
                                <canvas
                                    ref={canvasRef}
                                    width={600}
                                    height={800}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        backgroundColor: selectedColor,
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Product details and options */}
                    <div className="w-full lg:w-1/4">
                        <div className="bg-white rounded-lg shadow-lg p-5">
                            <h6 className="font-bold text-lg mb-4">Product Options</h6>

                            <div className="space-y-4">
                                <Select
                                    label="Product Type"
                                    selectedKeys={[selectedProduct]}
                                    onChange={(e) => setSelectedProduct(e.target.value)}
                                >
                                    {products.map((product) => (
                                        <SelectItem key={product.id} value={product.id}>
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
                                                className="min-w-12"
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
                                    color="success"
                                    size="lg"
                                    className="w-full"
                                    startContent={<FaShoppingCart />}
                                >
                                    Add to Cart
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

            <footer className="bg-gray-800 text-white py-6 mt-8">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="mb-4 md:mb-0">
                            <h4 className="font-bold text-xl flex items-center">
                                <IoLogoDeviantart className="mr-2" />
                                Design Studio Pro
                            </h4>
                            <p className="text-gray-400 text-sm mt-1">Create custom designs for your products</p>
                        </div>

                        <div className="flex space-x-6">
                            <div>
                                <h5 className="font-medium mb-2">Support</h5>
                                <ul className="text-gray-400 text-sm space-y-1">
                                    <li>Help Center</li>
                                    <li>Contact Us</li>
                                    <li>FAQs</li>
                                </ul>
                            </div>

                            <div>
                                <h5 className="font-medium mb-2">Legal</h5>
                                <ul className="text-gray-400 text-sm space-y-1">
                                    <li>Terms of Service</li>
                                    <li>Privacy Policy</li>
                                    <li>Copyright Info</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-gray-700 mt-6 pt-6 text-center text-gray-400 text-sm">
                        © {new Date().getFullYear()} Design Studio Pro. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default DesignStudio;