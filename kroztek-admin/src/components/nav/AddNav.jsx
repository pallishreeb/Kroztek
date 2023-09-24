/** @format */

import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import Box from "@mui/material/Box";

export default function BasicTabs({ value, setValue }) {
    // const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        console.log(value);
    };

    return (
        <Box sx={{ width: "100%", position: "relative", marginTop: "1rem" }}>
            <Box
                sx={{
                    borderBottom: 1,
                    borderColor: "divider",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Tabs
                    value={value}
                    onChange={setValue && handleChange}
                    aria-label="basic tabs example"
                    variant="fullWidth"
                    textColor="secondary"
                    indicatorColor="secondary"
                >
                    <Tab label="Text" />
                    <Tab label="Links & Category" />
                    <Tab label="Images & Files" />
                </Tabs>
            </Box>
        </Box>
    );
}
