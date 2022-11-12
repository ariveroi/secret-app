import React, { useState } from "react";

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
  },
];

const Hardcoded = () => {
  const [sup00101, setSup00101] = useState("");
  const [arch00101, setArch00101] = useState("");
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

  const exportToExcel = () => {
    fetch("https://hziubgj072.execute-api.eu-west-2.amazonaws.com/dev").then(
      (res) => console.log(res)
    );
    // Call APi gateway that triggers a lambda, that lambda is going to parse the excel file and send it back to front end
    // const worksheet = XLSX.utils.json_to_sheet(allControls);
    // const workbook = XLSX.utils.book_new("Sheet1");
    // XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    // XLSX.writeFile(workbook, "SelfAssessment.xlsx");
    // let buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });
    // XLSX.write(workbook, { bookType: "xlsx", type: "binary" });
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
                  <MenuItem value={"yes"}>Yes</MenuItem>
                  <MenuItem value={"no"}>No</MenuItem>
                </Select>
              </FormControl>
            </div>
            {allControls[1].value === "yes" && (
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
                  <h3>
                    CAA-001. Use cross-account roles to access customer
                    accounts.{" "}
                  </h3>
                  <p>
                    <a href="https://aws.amazon.com/blogs/apn/securely-accessing-customer-aws-accounts-with-cross-account-iam-roles/">
                      Cross-account roles
                    </a>{" "}
                    reduce the amount of sensitive information AWS Partners need
                    to store for their customers.{" "}
                  </p>
                  <TextField
                    id="caa-001"
                    label="Provide more context"
                    multiline
                    rows={4}
                    className="sub-question-textarea"
                  />
                </div>
                <div className="card-content-description">
                  <h3>
                    CAA-002. Use external ID with cross-account roles to access
                    customer accounts.
                  </h3>
                  <p>
                    The external ID allows the user that is assuming the role to
                    assert the circumstances in which they are operating. It
                    also provides a way for the account owner to permit the role
                    to be assumed only under specific circumstances. The primary
                    function of the external ID is to address and prevent the{" "}
                    <a href="https://aws.amazon.com/blogs/security/how-to-use-external-id-when-granting-access-to-your-aws-resources">
                      confused deputy
                    </a>{" "}
                    problem.
                  </p>
                  <TextField
                    id="caa-002"
                    label="Provide more context"
                    multiline
                    rows={4}
                    className="sub-question-textarea"
                  />
                </div>
              </>
            )}
          </CardContent>
        </Card>
        <Button
          variant="contained"
          style={{ marginTop: "40px" }}
          onClick={exportToExcel}
        >
          Download Excel
        </Button>
      </Container>
    </div>
  );
};

export default Hardcoded;
