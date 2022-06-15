import { PortableText as BasePortableText } from "@portabletext/react";
import React from "react";
import clientConfig from "../../client-config";

const PortableText = ({ blocks }) => (
  <BasePortableText value={blocks} {...clientConfig.sanity} />
);

export default PortableText;
