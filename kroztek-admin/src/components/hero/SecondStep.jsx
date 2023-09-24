import React from 'react'
import { Box, TextField } from '@mui/material'
const SecondStep = ({ value, setForm, form }) => {
  const display = value === 1 ? "" : "none"
  const handleChange = (e) => {
    // console.log(form);
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }
  return (
    <Box sx={{ display: display }}>
      <div className="row mt-1" >
        <div className="col-sm-12 col-md-12 col-lg-12">
          <TextField label="Brand" fullWidth name='brand' value={form.brand} onChange={(e) => handleChange(e)} />
        </div>

      </div>
      <div className="row mt-3">
        <div className="col-sm-12 col-md-12 col-lg-12">
          <TextField label="Model" fullWidth name='model' value={form.model} onChange={(e) => handleChange(e)} />
        </div>

      </div>
      <div className="row mt-3">
        <div className="col-sm-12 col-md-12 col-lg-12">
          <TextField label="Website Url" fullWidth name='websitesLink' value={form.websitesLink} onChange={(e) => handleChange(e)} />
        </div>

      </div>
      <div className="row mt-3">
        <div className="col-sm-12 col-md-12 col-lg-12">
          <TextField label="Youtube Link" fullWidth name='youtubeLink' value={form.youtubeLink} onChange={(e) => handleChange(e)} />
        </div>

      </div>

    </Box>
  )
}

export default SecondStep