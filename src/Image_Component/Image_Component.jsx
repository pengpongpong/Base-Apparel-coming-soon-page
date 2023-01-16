import React from "react";
import Image from "next/image";

function Image_Component({
  mobile_img,
  mobile_w,
  mobile_h,
  desktop_img,
  desktop_w,
  desktop_h,
}) {
  return (
    <picture>
      <Image
        width={mobile_w}
        height={mobile_h}
        src={mobile_img}
        className="business_img mobile"
        alt="business-image"
      />
      <Image
        width={desktop_w}
        height={desktop_h}
        src={desktop_img}
        className="business_img desktop"
        alt="business-image"
      />
    </picture>
  );
}

export default Image_Component;
