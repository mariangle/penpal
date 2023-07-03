import { IUser } from '@/common.types';
import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const modules = {
    toolbar: [
        ["bold", "italic", "underline", "strike"],
        ["image"]
    ]
}

interface EditorProps {
    value: string;
    onChange: (value: string) => void;
    recipient: IUser | undefined;
  }
  
const Editor: React.FC<EditorProps> = ({ value, onChange, recipient }) => {
    return (
        <ReactQuill  
            className="mt-4" 
            theme="snow" value={value} 
            onChange={onChange}  
            modules={modules} 
            placeholder={"Write your letter here..."}
        />  
    )
}

export default Editor;