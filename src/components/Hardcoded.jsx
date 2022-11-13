import React, { useState } from "react";

import axios from "axios";
import * as XLSX from "xlsx";

// import { fromFileAsync } from "xlsx-populate";

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
  TextField,
} from "@mui/material";
import { type } from "@testing-library/user-event/dist/type";

const api_url = "http://127.0.0.1:5000/";

const controls = [
  {
    id: "SUP-001",
    title: `Enable AWS Business Support (or greater) on all
    production AWS accounts or have an action plan to handle issues
    which require help from AWS Support.`,
    innerHTML: {
      __html: `Subscribing to AWS Business Support or greater for all
    production accounts provides faster response time from AWS
    Support and strongly recommended. If you don't have premium
    support, you must have an action plan to handle issues which
    require help from AWS Support. AWS Support provides a mix of
    tools and technology, people, and programs designed to
    proactively help you optimize performance, lower costs, and
    innovate faster.
    <a
      target="blank"
      href="https://aws.amazon.com/premiumsupport/plans/business/"
    >
      
      AWS Business Support
    </a> 
    provides additional benefits including access to 
    <a
      target="blank"
      href="https://aws.amazon.com/premiumsupport/technology/trusted-advisor/"
    >
      AWS Trusted Advisor
    </a> 
    and 
    <a
      target="blank"
      href="https://aws.amazon.com/premiumsupport/technology/personal-health-dashboard/"
    >
       
      AWS Personal Health Dashboard
    </a> 
    and faster response times</>`,
    },
    value: "",
    comment: "",
    value_cell: "C9",
    comment_cell: "D9",
  },
  {
    id: "ARC-001",
    title: "ARC-001. Use root user only by exception. (CIS 2.1)",
    innerHTML: {
      __html: `The root user has unlimited access to your account and its
    resources, and using it only by exception helps protect your AWS
    resources. The AWS root user must not be used for everyday
    tasks, even administrative ones. Instead, adhere to the 
    <a
      target="blank"
      href="https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html#create-iam-users"
    >
      best practice of using the root user only to create your first
      AWS Identity and Access Management (IAM) user
    </a>
    . Then securely lock away the root user credentials and use them
    to perform only a few account and service management tasks. To
    view the tasks that require you to sign in as the root user, see 
    <a
      target="blank"
      href="https://docs.aws.amazon.com/general/latest/gr/aws_tasks-that-require-root.html"
    >
      AWS Tasks That Require Root User
    </a>`,
    },
    value: "",
    comment: "",
    value_cell: "C19",
    comment_cell: "D19",
  },
  {
    id: "CAA-001",
    title: "Use cross-account roles to access customer accounts.",
    innerHTML: {
      __html: `<a href="https://aws.amazon.com/blogs/apn/securely-accessing-customer-aws-accounts-with-cross-account-iam-roles/">
      Cross-account roles
    </a> reduce the amount of sensitive information AWS Partners need
    to store for their customers.`,
    },
    value: "n/a",
    comment: "",
    value_cell: "C83",
    comment_cell: "D83",
  },
  {
    id: "CAA-002",
    title:
      "Use external ID with cross-account roles to access customer accounts.",
    innerHTML: {
      __html: `The external ID allows the user that is assuming the role to
      assert the circumstances in which they are operating. It
      also provides a way for the account owner to permit the role
      to be assumed only under specific circumstances. The primary
      function of the external ID is to address and prevent the <a href="https://aws.amazon.com/blogs/security/how-to-use-external-id-when-granting-access-to-your-aws-resources">
        confused deputy
      </a> 
      problem.`,
    },
    value: "n/a",
    comment: "",
    value_cell: "C85",
    comment_cell: "D85",
  },
];

const Hardcoded = () => {
  const [caa00101, setCaa00101] = useState("");
  const [allControls, setControls] = useState(controls);

  const handleSelectChange = (e, idx) => {
    let newArray = [...allControls];
    newArray[idx].value = e.target.value;
    setControls(newArray);
    console.log(allControls);
  };

  const handleTextareaChange = (e, idx) => {
    let newArray = [...allControls];
    newArray[idx].comment = e.target.value;
    setControls(newArray);
    console.log(allControls);
  };

  const handleSubmit = async () => {
    await axios
      .post(api_url + "gen_excel", { body: allControls })
      .then((res) => console.log(res));
    exportToExcel();
  };

  const exportToExcel = () => {
    axios
      .get(api_url + "get_excel", {
        method: "GET",
        responseType: "blob", // important
      })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${Date.now()}.xlsx`);
        document.body.appendChild(link);
        link.click();
      });
  };

  return (
    <div className="content">
      <Container maxWidth="md">
        <Card className="card" variant="outlined">
          <CardHeader title="AWS Support" />
          <CardContent className="card-content">
            <div className="card-content-description">
              <h3>
                {allControls[0].id}. {allControls[0].title}
              </h3>
              <p dangerouslySetInnerHTML={allControls[0].innerHTML}></p>
            </div>
            <div className="question">
              <span>
                Do you have AWS Business Support (or greater) on all production
                AWS accounts?
              </span>
              <FormControl className="select">
                {/* <FormLabel>This is a form label example</FormLabel> */}
                <InputLabel id="sup-001-01">Yes/No</InputLabel>
                <Select
                  labelId="sup-001-01"
                  value={allControls[0].value}
                  label="Yes/No"
                  onChange={(e) => handleSelectChange(e, 0)}
                >
                  <MenuItem value={"yes"}>Yes</MenuItem>
                  <MenuItem value={"no"}>No</MenuItem>
                </Select>
              </FormControl>
            </div>
            {allControls[0].value == "no" && (
              <div className="sub-question">
                <span>
                  What other action plan is in place for escalations regarding
                  support with AWS resources and infrastructure?{" "}
                </span>
                <TextField
                  id="sup-001-02"
                  label="Provide more context"
                  multiline
                  rows={4}
                  className="sub-question-textarea"
                  onChange={(e) => handleTextareaChange(e, 0)}
                />
              </div>
            )}
          </CardContent>
        </Card>
        <Card className="card" variant="outlined">
          <CardHeader title="Architecture" />
          <CardContent className="card-content">
            <div className="card-content-description">
              <h3>
                {allControls[1].id}. {allControls[1].title}
              </h3>
              <p dangerouslySetInnerHTML={allControls[1].innerHTML}></p>
            </div>
            <div className="question">
              <span>
                Is the root user used for operational tasks that do not
                exclusively require the root account?{" "}
              </span>
              <FormControl className="select">
                {/* <FormLabel>This is a form label example</FormLabel> */}
                <InputLabel id="sup-001-01">Yes/No</InputLabel>
                <Select
                  labelId="sup-001-01"
                  value={allControls[1].value}
                  label="Yes/No"
                  onChange={(e) => handleSelectChange(e, 1)}
                >
                  <MenuItem value={"no"}>Yes</MenuItem>
                  <MenuItem value={"yes"}>No</MenuItem>
                </Select>
              </FormControl>
            </div>
            {allControls[1].value === "no" && (
              <div className="sub-question">
                <span>
                  Please provide information on who has access to the root user
                  account, and for what purposes it is typically used for, and
                  who/how many people have access to the credentials?
                </span>
                <TextField
                  id="arc-001-02"
                  label="Provide more context"
                  multiline
                  rows={4}
                  className="sub-question-textarea"
                  onChange={(e) => handleTextareaChange(e, 1)}
                />
              </div>
            )}
          </CardContent>
        </Card>
        <Card className="card" variant="outlined">
          <CardHeader title="Cross-Account" />
          <CardContent className="card-content">
            <div className="question">
              <span>
                Do any accounts owned by your organisation call AWS APIs in
                accounts owned by your Customers?
              </span>
              <FormControl className="select">
                {/* <FormLabel>This is a form label example</FormLabel> */}
                <InputLabel id="sup-001-01">Yes/No</InputLabel>
                <Select
                  labelId="sup-001-01"
                  value={caa00101}
                  label="Yes/No"
                  onChange={(e) => setCaa00101(e.target.value)}
                >
                  <MenuItem value={"yes"}>Yes</MenuItem>
                  <MenuItem value={"no"}>No</MenuItem>
                </Select>
              </FormControl>
            </div>
            {caa00101 === "yes" && (
              <>
                <div className="card-content-description">
                  <div className="question">
                    <div className="control-question">
                      <h3>
                        {allControls[2].id}. {allControls[2].title}
                      </h3>
                      <p dangerouslySetInnerHTML={allControls[2].innerHTML}></p>
                    </div>
                    <FormControl className="select">
                      {/* <FormLabel>This is a form label example</FormLabel> */}
                      <InputLabel id="sup-001-01">Yes/No</InputLabel>
                      <Select
                        labelId="caa-001"
                        value={""}
                        label="Yes/No"
                        onChange={(e) => handleSelectChange(e, 2)}
                      >
                        <MenuItem value={"yes"}>Yes</MenuItem>
                        <MenuItem value={"no"}>No</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                  <div className="sub-question">
                    <TextField
                      id="caa-001"
                      label="Provide more context"
                      multiline
                      rows={4}
                      className="sub-question-textarea"
                      onChange={(e) => handleTextareaChange(e, 2)}
                    />
                  </div>
                </div>
                <div className="card-content-description">
                  <div className="question">
                    <div className="control-question">
                      <h3>
                        {allControls[3].id}. {allControls[3].title}
                      </h3>
                      <p dangerouslySetInnerHTML={allControls[3].innerHTML}></p>
                    </div>
                    <FormControl className="select">
                      {/* <FormLabel>This is a form label example</FormLabel> */}
                      <InputLabel id="sup-001-01">Yes/No</InputLabel>
                      <Select
                        labelId="caa-001"
                        value={""}
                        label="Yes/No"
                        onChange={(e) => handleSelectChange(e, 2)}
                      >
                        <MenuItem value={"yes"}>Yes</MenuItem>
                        <MenuItem value={"no"}>No</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                  <div className="sub-question">
                    <TextField
                      id="caa-001"
                      label="Provide more context"
                      multiline
                      rows={4}
                      className="sub-question-textarea"
                      onChange={(e) => handleTextareaChange(e, 2)}
                    />
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
        <Button
          variant="contained"
          style={{ marginTop: "40px" }}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Container>
    </div>
  );
};

export default Hardcoded;
