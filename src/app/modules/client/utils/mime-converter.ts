/*
 * Copyright (c) 2024 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import {
  IconDefinition,
  faFile,
  faFileAlt,
  faFileArchive,
  faFileAudio,
  faFileCode,
  faFileExcel,
  faFilePdf,
  faFilePowerpoint,
  faFileVideo,
  faFileWord,
} from '@fortawesome/free-solid-svg-icons';

type MimeIcon = {
  [key: string]: IconDefinition;
};

/* prettier-ignore */
const mimeTypes: MimeIcon = {
  'audio': faFileAudio,
  'video': faFileVideo,
  'application/pdf': faFilePdf,
  'application/msword': faFileWord,
  'application/vnd.oasis.opendocument.text': faFileWord,
  'application/vnd.openxmlformats-officedocument.wordprocessingml': faFileWord,
  'application/vnd.ms-excel': faFileExcel,
  'application/vnd.openxmlformats-officedocument.spreadsheetml': faFileExcel,
  'application/vnd.oasis.opendocument.spreadsheet': faFileExcel,
  'application/vnd.ms-powerpoint': faFilePowerpoint,
  'application/vnd.openxmlformats-officedocument.presentationml': faFilePowerpoint,
  'application/vnd.oasis.opendocument.presentation': faFilePowerpoint,
  'text/plain': faFileAlt,
  'text/html': faFileCode,
  'application/json': faFileCode,
  'application/gzip': faFileArchive,
  'application/zip': faFileArchive,
};

export function getFontAwesomeIconFromMime(mimeType: string): IconDefinition {
  const candidate = Object.entries(mimeTypes).find(([k]) =>
    mimeType.startsWith(k)
  );
  return candidate === undefined ? faFile : candidate[1];
}
