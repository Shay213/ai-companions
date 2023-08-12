"use client";

import React from "react";
import { CldUploadButton } from "next-cloudinary";
import Image from "next/image";

type Props = {
  value: string;
  onChange: (src: string) => void;
  disable?: boolean;
};

const ImageUpload = ({ onChange, value, disable }: Props) => {
  return (
    <div className="space-y-4 w-full flex flex-col justify-center items-center">
      <CldUploadButton
        options={{ maxFiles: 1 }}
        uploadPreset="c0wndpiz"
        onUpload={(result: any) => onChange(result.info.secure_url)}
      >
        <div className="p-4 border-4 border-dashed border-primary/10 rounded-lg hover:opacity-75 transition flex flex-col space-y-2 items-center justify-center">
          <div className="relative h-40 w-40">
            <Image
              src={value || "/placeholder.svg"}
              alt="upload"
              className="rounded-lg object-cover"
              fill
            />
          </div>
        </div>
      </CldUploadButton>
    </div>
  );
};

export default ImageUpload;
