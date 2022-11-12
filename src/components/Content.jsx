import React, { useState } from "react";
import Control from "./Control";

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

const controls = [
  {
    id: "001",
    sectionTitle: "AWS Support",
    controls: [
      {
        id: "SUP-001",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse temporibus quasi illum, neque expedita officiis ad nostrum nobis aut maiores quis ex reiciendis reprehenderit voluptas optio tempore animi vitae eaque. Unde saepe voluptates consequuntur fuga, quam magni assumenda sequi quae, exercitationem doloribus ad omnis praesentium reprehenderit qui natus facere dicta aliquid? Repellat ducimus vero voluptatum esse ea tempore sequi adipisci.",
        insight: "This is an insight of the control",
        value: "",
        hasSubcontrols: true,
        subcontrols: [
          {
            id: "SUP-001-01",
            text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse temporibus quasi illum, neque expedita officiis ad nostrum nobis aut maiores quis ex reiciendis reprehenderit voluptas optio tempore animi vitae eaque. Unde saepe voluptates consequuntur fuga, quam magni assumenda sequi quae, exercitationem doloribus ad omnis praesentium reprehenderit qui natus facere dicta aliquid? Repellat ducimus vero voluptatum esse ea tempore sequi adipisci.",
            insight: "This is a secondaty insight of the subcontrol",
            value: "",
            hasSubcontrols: false,
          },
        ],
      },
    ],
  },
  {
    id: "002",
    sectionTitle: "Resilience",
    controls: [
      {
        id: "RES-001",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse temporibus quasi illum, neque expedita officiis ad nostrum nobis aut maiores quis ex reiciendis reprehenderit voluptas optio tempore animi vitae eaque. Unde saepe voluptates consequuntur fuga, quam magni assumenda sequi quae, exercitationem doloribus ad omnis praesentium reprehenderit qui natus facere dicta aliquid? Repellat ducimus vero voluptatum esse ea tempore sequi adipisci.",
        insight: "This is an insight of the control of resilience",
        value: "",
        hasSubcontrols: true,
        subcontrols: [
          {
            id: "RES-001-01",
            text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse temporibus quasi illum, neque expedita officiis ad nostrum nobis aut maiores quis ex reiciendis reprehenderit voluptas optio tempore animi vitae eaque. Unde saepe voluptates consequuntur fuga, quam magni assumenda sequi quae, exercitationem doloribus ad omnis praesentium reprehenderit qui natus facere dicta aliquid? Repellat ducimus vero voluptatum esse ea tempore sequi adipisci.",
            insight:
              "This is a secondaty insight of the subcontrol of resilience",
            value: "",
            hasSubcontrols: false,
          },
        ],
      },
    ],
  },
];

const Content = () => {
  const [age, setAge] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [mySections, setMySections] = useState(controls);
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const sectionsList = mySections.map((section, sectionIdx) => {
    const controlList = section.controls.map((control, controlIdx) => {
      const handleChange = (e) => {
        let newSectionArray = [...mySections];
        newSectionArray[sectionIdx].controls[controlIdx].value = e.target.value;
        setMySections(newSectionArray);
      };
      const subControlsList =
        control.hasSubcontrols &&
        control.subcontrols.map((subcontrol) => {
          return (
            <CardContent className="card-content">
              <div key={subcontrol.id} className="card-content-description">
                <h3>
                  {subcontrol.id}{" "}
                  <Button
                    aria-describedby={subcontrol.id}
                    variant="contained"
                    onClick={handleClick}
                  >
                    i
                  </Button>
                  <Popover
                    id={subcontrol.id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                  >
                    <Typography sx={{ p: 2 }}>{subcontrol.insight}</Typography>
                  </Popover>
                </h3>
                <p>{subcontrol.text}</p>
              </div>
              <FormControl>
                {/* <FormLabel>This is a form label example</FormLabel> */}
                <InputLabel id="demo-id">Yes/No</InputLabel>
                <Select
                  aria-describedby="helper-text"
                  labelId="demo-id"
                  value={subcontrol.value}
                  label="Yes/No"
                  onChange={handleChange}
                >
                  <MenuItem value={"yes"}>Yes</MenuItem>
                  <MenuItem value={"no"}>No</MenuItem>
                  <MenuItem value={"n/a"}>N/A</MenuItem>
                </Select>
                <FormHelperText id="helper-text">
                  This is a helper text
                </FormHelperText>
              </FormControl>
            </CardContent>
          );
        });
      return (
        <>
          <CardContent className="card-content">
            <div key={control.id} className="card-content-description">
              <h3>
                {control.id}{" "}
                <Button
                  aria-describedby={control.id}
                  variant="contained"
                  onClick={handleClick}
                >
                  i
                </Button>
                <Popover
                  id={control.id}
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                >
                  <Typography sx={{ p: 2 }}>{control.insight}</Typography>
                </Popover>
              </h3>
              <p>{control.text}</p>
            </div>
            <FormControl>
              {/* <FormLabel>This is a form label example</FormLabel> */}
              <InputLabel id="demo-id">Yes/No</InputLabel>
              <Select
                aria-describedby="helper-text"
                labelId="demo-id"
                value={control.value}
                label="Yes/No"
                onChange={handleChange}
              >
                <MenuItem value={"yes"}>Yes</MenuItem>
                <MenuItem value={"no"}>No</MenuItem>
                <MenuItem value={"n/a"}>N/A</MenuItem>
              </Select>
              <FormHelperText id="helper-text">
                This is a helper text
              </FormHelperText>
            </FormControl>
          </CardContent>
          {control.value === "yes" && subControlsList}
        </>
      );
    });
    return (
      <Card key={section.id} className="card" variant="outlined">
        <CardHeader title={section.title} />
        {controlList}
      </Card>
    );
  });

  return (
    <main className="content">
      <Container maxWidth="md">
        {/* <Card className="card" variant="outlined">
          <CardHeader title="AWS Support" />
          <CardContent className="card-content">
            <div className="card-content-description">
              <h3>
                Control 1{" "}
                <Button
                  aria-describedby="popover-id"
                  variant="contained"
                  onClick={handleClick}
                >
                  i
                </Button>
                <Popover
                  id="popover-id"
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                >
                  <Typography sx={{ p: 2 }}>
                    The content of the Popover.
                  </Typography>
                </Popover>
              </h3>
              <p></p>
            </div>
            <FormControl>
              <InputLabel id="demo-id">Yes/No</InputLabel>
              <Select
                aria-describedby="helper-text"
                labelId="demo-id"
                value={age}
                label="Yes/No"
                onChange={(e) => setAge(e.target.value)}
              >
                <MenuItem value={"yes"}>Yes</MenuItem>
                <MenuItem value={"no"}>No</MenuItem>
                <MenuItem value={"n/a"}>N/A</MenuItem>
              </Select>
              <FormHelperText id="helper-text">
                This is a helper text
              </FormHelperText>
            </FormControl>
          </CardContent>
          {age === "yes" && (
            <CardContent className="card-content">
              <div className="card-content-description">
                <h3>
                  Control 1{" "}
                  <Button
                    aria-describedby="popover-id"
                    variant="contained"
                    onClick={handleClick}
                  >
                    i
                  </Button>
                  <Popover
                    id="popover-id"
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                  >
                    <Typography sx={{ p: 2 }}>
                      The content of the Popover.
                    </Typography>
                  </Popover>
                </h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse
                  temporibus quasi illum, neque expedita officiis ad nostrum
                  nobis aut maiores quis ex reiciendis reprehenderit voluptas
                  optio tempore animi vitae eaque. Unde saepe voluptates
                  consequuntur fuga, quam magni assumenda sequi quae,
                  exercitationem doloribus ad omnis praesentium reprehenderit
                  qui natus facere dicta aliquid? Repellat ducimus vero
                  voluptatum esse ea tempore sequi adipisci.
                </p>
              </div>
              <FormControl>
                <InputLabel id="demo-id">Yes/No</InputLabel>
                <Select
                  aria-describedby="helper-text"
                  labelId="demo-id"
                  value={age}
                  label="Yes/No"
                  onChange={(e) => setAge(e.target.value)}
                >
                  <MenuItem value={"yes"}>Yes</MenuItem>
                  <MenuItem value={"no"}>No</MenuItem>
                  <MenuItem value={"n/a"}>N/A</MenuItem>
                </Select>
                <FormHelperText id="helper-text">
                  This is a helper text
                </FormHelperText>
              </FormControl>
            </CardContent>
          )}
        </Card> */}
        {/* {sectionsList} */}
        <Control
          title="AWS Support"
          question_title="This is the title"
          question_text="This is the text of the question"
        />
      </Container>
    </main>
  );
};

export default Content;
