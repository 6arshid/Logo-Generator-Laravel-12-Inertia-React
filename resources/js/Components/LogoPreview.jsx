import { useRef } from 'react';
import * as htmlToImage from 'html-to-image';
import download from 'downloadjs';

export default function LogoPreview({ text, font, textColor, icon, iconColor, iconPosition }) {
    const logoRef = useRef();

    const logoStyle = {
        fontFamily: `'${font}', sans-serif`,
        color: textColor,
        fontSize: '2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        padding: '1rem',
        background: 'white',
        border: '1px solid #ddd',
        borderRadius: '0.5rem',
        width: 'fit-content',
    };

    const iconStyle = {
        color: iconColor,
        fontSize: '2rem'
    };

    const downloadPNG = () => {
        if (!logoRef.current) return;
        htmlToImage.toPng(logoRef.current)
            .then((dataUrl) => {
                download(dataUrl, 'logo.png');
            })
            .catch((error) => {
                console.error('Error generating PNG:', error);
            });
    };

    const downloadSVG = () => {
        if (!logoRef.current) return;
        htmlToImage.toSvg(logoRef.current)
            .then((dataUrl) => {
                download(dataUrl, 'logo.svg');
            })
            .catch((error) => {
                console.error('Error generating SVG:', error);
            });
    };

    return (
        <div className="space-y-4">
            <div ref={logoRef} style={logoStyle}>
                {icon && iconPosition === 'left' && (
                    <span style={iconStyle}>{icon}</span>
                )}
                <span>{text}</span>
                {icon && iconPosition === 'right' && (
                    <span style={iconStyle}>{icon}</span>
                )}
            </div>

            <div className="flex gap-4">
                <button
                    onClick={downloadPNG}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
                >
                    📥 Download PNG
                </button>

                <button
                    onClick={downloadSVG}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition"
                >
                    📥 Download SVG
                </button>
            </div>
        </div>
    );
}
