import React, { useState } from 'react'
import { makeStyles } from '@mui/styles'
import { useDropzone } from 'react-dropzone'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import DeleteIcon from '@mui/icons-material/Delete'

import {
  Button,
  IconButton,
} from '@mui/material'
import * as srv from 'site/services'
import styles from './styles'

const useStyles = makeStyles(styles)

const MAX_SIZE = 9242880 // max 9 Mb
const MIN_SIZE = 100 // min 100 bytes

export default (props) => {
  const [uploads, setUploads] = useState([])
  const classes = useStyles()

  const {
    onUpload,
    onError,
    onDelete,
    actionButton = false,
    multi = false,
    limit = 10, // limit to 10 image per upload
    maxSize = MAX_SIZE,
    minSize = MIN_SIZE,
  } = props

  const doUpload = async () => {
    const success = await onUpload(uploads)
    if (success) setUploads([]) // reset uploads after successful upload
  }

  const onDrop = async (files) => {
    try {
      const uploadFiles = multi ? files.slice(0, limit) : files.slice(0, 1)
      const presignedUrlReqs = uploadFiles.map((file) => srv.getPresignedUrls({
        path: file.path,
        type: file.type,
      }))
      const urls = await Promise.all(presignedUrlReqs)

      const newUploads = uploadFiles.map((file, index) => ({
        file,
        preview: URL.createObjectURL(file),
        preSignedUrl: urls[index].data.url,
        fileUrl: urls[index].data.mainUrl,
      }))

      const updatedUploads = multi ? uploads.concat(newUploads) : newUploads

      setUploads(updatedUploads)

      // auto trigger upload if there is no action button
      if (!actionButton) onUpload(updatedUploads)
    } catch (error) {
      if (onError) onError(error)
    }
  }

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    fileRejections,
  } = useDropzone({
    accept: 'image/jpeg, image/png',
    maxSize,
    minSize,
    onDrop,
    // noClick: true,
  })

  return (
    <div>
      <div {...getRootProps({ className: classes.attach })}>
        <input {...getInputProps()} />
        <CloudUploadIcon color="primary" fontSize="large" />
        <span className={classes.message}>
          {isDragActive ?
            'Drop the files here ...' :
            'Upload logo or just drag and drop'}
        </span>

        {(fileRejections && fileRejections.length > 0) &&
        fileRejections.map((file) => file.errors.map((error) => (
          <div
            key={`upload-file-error-${file.path}-${error.code}`}
            className={classes.errorText}
          >
            {error.message}
          </div>
        )))}
        {(uploads && uploads.length > 0) && (
          <div className={classes.selectedImgContainer}>
            {uploads.map((upload) => (
              <div
                key={upload.file.path}
                style={{ position: 'relative', width: '100%' }}
              >
                <img
                  className={classes.selectedImg}
                  src={upload.preview}
                  alt={upload.file.path}
                />
                <IconButton
                  className={classes.removeButton}
                  color="primary"
                  title="Remove"
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    const currentUpload = uploads.filter((upld) => upld.file.path !== upload.file.path)
                    setUploads(currentUpload)
                    if (onDelete) onDelete(currentUpload)
                  }}
                  size="large"
                >
                  <DeleteIcon classes={{ root: classes.iconRemove }} />
                </IconButton>
              </div>
            ))}
          </div>
        )}
      </div>
      {(uploads && uploads.length > 0 && actionButton) && (
        <Button
          variant="contained"
          color="secondary"
          className={classes.buttonUpload}
          onClick={doUpload}

        >
          Upload
        </Button>
      )}
    </div>
  )
}
