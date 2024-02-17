import React, { useState } from 'react';
import { useSpeechSynthesis } from 'react-speech-kit';

async function query(data) {
    const response = await fetch(
        "https://api-inference.huggingface.co/models/suno/bark",
        {
            headers: { Authorization: "Bearer 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" },
            method: "POST",
            body: JSON.stringify(data),
        }
    );
    const result = await response.blob();
    return result;
}

function TextToSpeech() {
    const [text, setText] = useState('');
    const { speak } = useSpeechSynthesis();

    const handleSpeak = async () => {
        const audioBlob = await query({ "inputs": text });
        speak({ src: URL.createObjectURL(audioBlob) });
    };

    return (
        <div>
            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text to convert to speech..."
            />
            <button onClick={handleSpeak}>Speak</button>
        </div>
    );
}

export default TextToSpeech;
