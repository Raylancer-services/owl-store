import React, { useState } from "react";
import { LoadingButton } from "@mui/lab";
import { Typography, Box, TextField, Stack, Link } from "@mui/material";
import * as Api from "../../../services/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import logoImg from "../../../images/logo.png";
import layout from "../../../images/layout.png";
import Image from "../../../components/Image";
import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: "#EE2B70",
  backgroundColor: "#FDE7EF",
  "&:hover": {
    backgroundColor: "#EE2B70",
    color: "white",
  },
}));

const Signup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChangeUserName = (e: any) => {
    setUserName(e.target.value);
  };
  const onChangeEmail = (e: any) => {
    setEmail(e.target.value);
  };
  const onChangePassword = (e: any) => {
    setPassword(e.target.value);
  };

  const onClickSubmit = async () => {
    setLoading(true);

    const [signUpError, signUpResponse] = await Api.signUpSeller(
      username,
      email,
      password
    );
    if (signUpError) {
      toast.error("Something went wrong!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    if (signUpResponse) {
      console.log({ signUpResponse });
      localStorage.setItem("authToken", signUpResponse?.data?.token);
      localStorage.setItem("userRole", signUpResponse?.data?.result?.role);
      localStorage.setItem("approvedByAdmin", signUpResponse?.data?.result?.approvedByAdmin);
      navigate("/");
      toast.success("Register Success !", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    setLoading(false);
  };
  return (
    <>
      <Box
        sx={{
          width: { xs: "fix-layout", sm: "100%" },
          height: "100%",
          display: { sm: "flex" },
        }}
      >
        <Box
          sx={{
            width: { xs: "fix-layout", sm: "50%" },
            height: { xs: "fix-layout", sm: "100vh" },
            backgroundColor: "#F8AAC6",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              p: 5,
            }}
          >
            <Image disabledEffect src={logoImg} />
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              p: 1,
            }}
          >
            <Image
              disabledEffect
              src={layout}
              sx={{ width: 342, height: 342 }}
            />
          </Box>
        </Box>
        <Box
          sx={{
            width: { xs: "fix-layout", sm: "50%" },
            height: "fix-layout",
            p: 5,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <Typography variant="h6">
              Create a free account on device and get started 👋
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              mb: 2,
            }}
          >
            <Typography variant="h6">Create Seller Account</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <Stack
              direction={{ xs: "column", sm: "column" }}
              spacing={3}
              sx={{ width: { xs: "100%", sm: "60%" } }}
            >
              <TextField
                required={true}
                label="User name"
                variant="outlined"
                onChange={onChangeUserName}
              />
              <TextField
                required={true}
                label="Email ID"
                variant="outlined"
                onChange={onChangeEmail}
              />
              <TextField
                required={true}
                label="Password"
                variant="outlined"
                onChange={onChangePassword}
              />
            </Stack>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              mt: 5,
            }}
          >
            <Typography variant="body2" sx={{ mt: { md: -2 } }}>
              Already have an account? {""}
              <Link
                variant="subtitle2"
                onClick={() => navigate("/login")}
                sx={{ cursor: "pointer" }}
              >
                Login
              </Link>
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              mt: 3,
            }}
          >
            <Stack
              direction={{ xs: "column", sm: "column" }}
              spacing={3}
              sx={{ width: "60%" }}
            >
              <ColorButton
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                disabled={!email || !password || !username}
                onClick={onClickSubmit}
                // sx={{backgroundColor:"#F8AAC6"}}
              >
                {loading ? <CircularProgress /> : <>SIGNUP</>}
              </ColorButton>
            </Stack>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              mt: 3,
            }}
          ></Box>
        </Box>
      </Box>
      <ToastContainer />
    </>
  );
};

export default Signup;
