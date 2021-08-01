import React, { FunctionComponent, useMemo } from "react";
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

export const ProxerListUpload: FunctionComponent<{}> = () => {
  const { acceptedFiles, getRootProps, getInputProps, isDragAccept, isDragActive, isDragReject } = useDropzone({
    maxFiles: 1,
    accept: ".html",
  });

  const acceptedFileItems = acceptedFiles.map((file) => (
    <span key={file.path}>
      {file.name} - {file.size} bytes
    </span>
  ));

  return (
    <section className="container">
      <StyledDropzone {...getRootProps({ isDragAccept, isDragReject, isDragActive })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop your Proxer Profile here, or click to select</p>
      </StyledDropzone>
      <aside>
        <h4>File</h4>
        {acceptedFileItems}
      </aside>
    </section>
  );
};
