import React, { FunctionComponent } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";

interface DragProps {
  isDragAccept: boolean;
  isDragReject: boolean;
  isDragActive: boolean;
}

const getColor = (props: DragProps): string => {
  if (props.isDragActive) {
    return "#2196f3";
  }
  if (props.isDragAccept) {
    return "#00e676";
  }
  if (props.isDragReject) {
    return "#ff1744";
  }

  return "#eeeeee";
};

const StyledDropzone = styled.div<DragProps>`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 2px;
  border-color: ${(props) => getColor(props)};
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  outline: none;
  transition: border 0.24s ease-in-out;
  cursor: pointer;
`;

interface ProxerListUploadProps {
  onDrop: (acceptedFiles: File[]) => void;
}

export const ProxerListUpload: FunctionComponent<ProxerListUploadProps> = ({ onDrop }) => {
  const { acceptedFiles, getRootProps, getInputProps, isDragAccept, isDragActive, isDragReject } = useDropzone({
    maxFiles: 1,
    accept: ".html",
    onDrop: onDrop,
  });

  return (
    <StyledDropzone {...getRootProps({ isDragAccept, isDragReject, isDragActive })}>
      <input {...getInputProps()} />
      <p>Drag 'n' drop your Proxer Profile here, or click to select</p>
      <span>Selected File: {acceptedFiles[0] != null ? acceptedFiles[0].name : "none"}</span>
    </StyledDropzone>
  );
};
