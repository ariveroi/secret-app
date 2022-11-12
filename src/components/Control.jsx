import React from "react";

import {
  Button,
  Container,
  Card,
  CardHeader,
  CardContent,
  Select,
  FormControl,
  FormLabel,
  FormHelperText,
  InputLabel,
  MenuItem,
  Popover,
  Typography,
} from "@mui/material";

const Control = (props) => {
  return (
    <Card className="card" variant="outlined">
      <CardHeader title={props.title} />
      <CardContent className="card-content">
        <div className="card-content-description">
          <h3>{props.question_title}</h3>
          <p>{props.question_text}</p>
          <div className="control-questions">
            <h4>Hello</h4>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Control;
