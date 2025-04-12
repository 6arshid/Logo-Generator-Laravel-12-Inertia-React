import { useState, useEffect } from 'react';
import LogoPreview from '../Components/LogoPreview';
import EmojiPicker from 'emoji-picker-react';

export default function LogoGenerator() {
    const [text, setText] = useState("MyLogo");
    const [icon, setIcon] = useState("🔥");
    const [iconPosition, setIconPosition] = useState("left");
    const [font, setFont] = useState("Roboto");
    const [customFont, setCustomFont] = useState(null);
    const [textColor, setTextColor] = useState("#000000");
    const [iconColor, setIconColor] = useState("#ff0000");
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [fontSearch, setFontSearch] = useState("");

    // لیست انتخابی فونت‌ها (می‌تونی بزرگ‌ترش کنی یا از API بیاری)
    const allFonts = [
        "Roboto", "Lobster", "Poppins", "Oswald", "Playfair Display", "Bebas Neue",
        "Pacifico", "Raleway", "Rubik", "Dancing Script", "Merriweather", "Inter",
        "Josefin Sans", "Quicksand", "Caveat", "Anton"
    ];

    const filteredFonts = allFonts.filter(f => f.toLowerCase().includes(fontSearch.toLowerCase()));

    useEffect(() => {
        if (font && !customFont) {
            const link = document.createElement("link");
            link.href = `https://fonts.googleapis.com/css2?family=${font.replace(/ /g, '+')}&display=swap`;
            link.rel = "stylesheet";
            document.head.appendChild(link);
        }
    }, [font, customFont]);

    const handleFontUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const fontName = file.name.split(".")[0];
            const reader = new FileReader();
            reader.onload = function (event) {
                const font = new FontFace(fontName, `url(${event.target.result})`);
                font.load().then(function (loadedFace) {
                    document.fonts.add(loadedFace);
                    setCustomFont(fontName);
                    setFont(fontName);
                });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleIconUpload = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith("image")) {
            const reader = new FileReader();
            reader.onload = function (event) {
                setIcon(<img src={event.target.result} alt="icon" style={{ width: '2rem', height: '2rem' }} />);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="p-8 space-y-6">
            <h1 className="text-2xl font-bold mb-4">🎨 Logo Generator</h1>

            <div className="space-y-4">

                <div>
                    <label>Text:</label>
                    <input type="text" value={text} onChange={e => setText(e.target.value)} className="border p-2 rounded w-full" />
                </div>

                <div>
                    <label>Search Google Font:</label>
                    <input type="text" value={fontSearch} onChange={e => setFontSearch(e.target.value)} className="border p-2 rounded w-full" />
                </div>

                <div>
                    <label>Select Font:</label>
                    <select value={font} onChange={e => setFont(e.target.value)} className="border p-2 rounded w-full">
                        {filteredFonts.map(f => <option key={f} value={f}>{f}</option>)}
                    </select>
                </div>

                <div>
                    <label>Upload Custom Font (.ttf or .woff):</label>
                    <input type="file" accept=".ttf,.woff" onChange={handleFontUpload} />
                </div>

                <div>
                    <label>Text Color:</label>
                    <input type="color" value={textColor} onChange={e => setTextColor(e.target.value)} />
                </div>

                <div>
                    <label>Icon or Emoji:</label>
                    <div className="flex items-center gap-2">
                        <input type="text" value={typeof icon === "string" ? icon : ""} onChange={e => setIcon(e.target.value)} className="border p-2 rounded" />
                        <button onClick={() => setShowEmojiPicker(!showEmojiPicker)} className="bg-gray-200 px-2 py-1 rounded">😊</button>
                        <input type="file" accept="image/*" onChange={handleIconUpload} />
                    </div>
                    {showEmojiPicker && (
                        <div className="mt-2">
                            <EmojiPicker onEmojiClick={(emojiData) => {
                                setIcon(emojiData.emoji);
                                setShowEmojiPicker(false);
                            }} />
                        </div>
                    )}
                </div>

                <div>
                    <label>Icon Color:</label>
                    <input type="color" value={iconColor} onChange={e => setIconColor(e.target.value)} />
                </div>

                <div>
                    <label>Icon Position:</label>
                    <select value={iconPosition} onChange={e => setIconPosition(e.target.value)} className="border p-2 rounded w-full">
                        <option value="left">Left</option>
                        <option value="right">Right</option>
                    </select>
                </div>
            </div>

            <div className="mt-8">
                <h2 className="text-xl font-semibold mb-2">Preview:</h2>
                <LogoPreview
                    text={text}
                    font={font}
                    textColor={textColor}
                    icon={icon}
                    iconColor={iconColor}
                    iconPosition={iconPosition}
                />
            </div>
        </div>
    );
}
