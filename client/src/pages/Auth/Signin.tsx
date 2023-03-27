import React, { useState } from "react";
import { LoadingButton } from "@mui/lab";
import { Typography, Box, TextField, Stack, Link } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import * as Api from "../../services/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import logoImg from "../../images/logo.png";
import layout from "../../images/layout.png";
import Image from "../../components/Image";
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

const Signin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChangeEmail = (e: any) => {
    setEmail(e.target.value);
  };
  const onChangePassword = (e: any) => {
    setPassword(e.target.value);
  };

  const onClickSubmit = async () => {
    setLoading(true);
    const [signInError, signInResponse] = await Api.signIn(email, password);
    if (signInError) {
      console.log("signInError",signInError)
      toast.error(signInError?.data, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    if (signInResponse) {
      console.log(signInResponse?.data?.oldUser?.accountStatus);
      if (signInResponse?.data?.oldUser?.accountStatus === "BLOCKED") {
        toast.error("You have been Banned!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else {
        localStorage.setItem("authToken", signInResponse?.data?.token);
        localStorage.setItem("userRole", signInResponse?.data?.oldUser?.role);
        localStorage.setItem(
          "approvedByAdmin",
          signInResponse?.data?.oldUser?.approvedByAdmin
        );
        navigate("/");
        toast.success("Login Success !", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
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
            <Typography>Welcome back! 👋</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              mb: 2,
            }}
          >
            <Typography>Login to your account</Typography>
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
                label="Email"
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
            }}
          >
            {/* <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ my: 2 }}
            >
              <Link variant="subtitle2">Forgot password?</Link>
            </Stack> */}
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <Typography variant="body2" sx={{ mt: { md: 1 } }}>
              Don’t have an account? {""}? {""}
              <Link
                variant="subtitle2"
                onClick={() => navigate("/register")}
                sx={{ cursor: "pointer" }}
              >
                Sign Up
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
                onClick={onClickSubmit}
                disabled={!email || !password}
                // sx={{backgroundColor:"#F8AAC6"}}
              >
                {loading ? <CircularProgress /> : <>SIGNIN</>}
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
          >
            {/* <Typography>Or</Typography> */}
            {/* <Stack
              direction={{ xs: "column", sm: "column" }}
              spacing={3}
              sx={{ width: "60%" }}
            >
              <LoadingButton
                fullWidth
                size="large"
                type="submit"
                variant="outlined"
                startIcon={<GoogleIcon />}
                // sx={{backgroundColor:"#F8AAC6"}}
              >
                Signin with Google
              </LoadingButton>
              <LoadingButton
                fullWidth
                size="large"
                type="submit"
                variant="outlined"
                startIcon={<FacebookIcon />}
                // sx={{backgroundColor:"#F8AAC6"}}
              >
                Signin with Facebook
              </LoadingButton>
            </Stack> */}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Signin;
