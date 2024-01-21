import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import "./DialogExtension.css";

export default function DialogExtensionComponent(props) {
  const openviduExtensionUrl =
    "https://chrome.google.com/webstore/detail/openvidu-screensharing/lfcgfepafnobdloecchnfaclibenjold";

  const [isInstalled, setIsInstalled] = useState(false);

  const onNoClick = () => {
    props.cancelClicked();
  };

  const goToChromePage = () => {
    window.open(openviduExtensionUrl);
    setIsInstalled(true);
  };

  const refreshBrowser = () => {
    window.location.reload();
  };

  useEffect(() => {
    // componentDidMount 역할 수행
    // componentWillReceiveProps 대신 이 곳에서 처리
  }, []);

  return (
    <div>
      {props.showDialog && (
        <div id="dialogExtension">
          <Card id="card">
            <CardContent>
              <Typography color="textSecondary">Hello</Typography>
              <Typography color="textSecondary">
                You need to install this chrome extension and refresh the browser to be able to
                share your screen.
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={onNoClick}>
                Cancel
              </Button>

              <Button size="small" onClick={goToChromePage}>
                Install
              </Button>
              {isInstalled && (
                <Button size="small" onClick={refreshBrowser}>
                  Refresh
                </Button>
              )}
            </CardActions>
          </Card>
        </div>
      )}
    </div>
  );
}
