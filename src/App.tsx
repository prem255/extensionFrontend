import React, { useEffect } from "react";
import "./App.css";

import { executeActionOnCurrentTab } from "./chrome";
import { getUserDisplayName } from "./functions/scrape";
import CompanyCard from "./components/companyCard";
import CompanyTable from "./components/companyTable";

import SettingsOverscanIcon from "@mui/icons-material/SettingsOverscan";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CloseIcon from "@mui/icons-material/Close";
import { Button } from "@mui/material";

function App() {
  const [prevUrl, setPrevUrl] = React.useState("");

  const pattern = /https:\/\/www\.linkedin\.com\/[^/]+\/[^/]+\/about\//;
  const [data, setData] = React.useState<any>({});
  const [btnTab, setBtnTab] = React.useState<number>(0);
  React.useEffect(() => {
    if (!btnTab) {
      document.body.style.width = "380px";
      document.body.style.height = "500px";

    } else {
      document.body.style.width = "900px";
    }
  }, [btnTab]);

  function handleBtnChange() {
    setBtnTab((prevState) => (prevState === 0 ? 1 : 0));
  }
  const handleCloseClick = () => {
    // Close the extension tab
    window.close();
  };

  const buttonClick = () => {
    executeActionOnCurrentTab(getUserDisplayName).then((response) => {
      const newData = response ? JSON.parse(response) : {};
      setData(newData);
    });
  };

  useEffect(() => {
    buttonClick();
    console.log("i a chag")
    logCurrentUrl();
  }, [prevUrl]);

  function logCurrentUrl() {
    try {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        if (tabs && tabs.length > 0) {
          console.log("Current URL:", tabs[0].url);
          //@ts-ignore
          if (pattern.test(tabs[0].url)) setPrevUrl(tabs[0].url);
        }
      });
    } catch (e) {
      console.log("err",e)
    }
  }

  return (
    <>
      <div>
        <div id="switchBtn">
          {btnTab ? (
            <Button onClick={handleBtnChange}>
              <SettingsOverscanIcon fontSize="small" sx={{ color: "white" }} />
            </Button>
          ) : (
            <Button onClick={handleBtnChange}>
              <ArrowForwardIcon fontSize="small" sx={{ color: "white" }} />
            </Button>
          )}
          <Button onClick={handleCloseClick}>
            <CloseIcon fontSize="small" sx={{ color: "white" }} />
          </Button>
        </div>
        {btnTab ? <CompanyTable /> : <CompanyCard data={data} />}
      </div>
    </>
  );
}

export default App;
