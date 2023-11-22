import React, { useState } from "react";
import "./form.css";
import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import PersonIcon from "@mui/icons-material/Person";
import InputAdornment from "@mui/material/InputAdornment";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import { outlinedInputClasses } from "@mui/material/OutlinedInput";
import Carousel from "nuka-carousel";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SchoolIcon from "@mui/icons-material/School";

const customTheme = (outerTheme) =>
  createTheme({
    palette: {
      mode: outerTheme.palette.mode,
    },
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            "--TextField-brandBorderColor": "#6F7E8C",
            "--TextField-brandBorderHoverColor": "#B2BAC2",
            "--TextField-brandBorderFocusedColor": "#ff7900",
            "& label.Mui-focused": {
              color: "var(--TextField-brandBorderFocusedColor)",
            },
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          notchedOutline: {
            borderColor: "var(--TextField-brandBorderColor)",
          },
          root: {
            [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: "var(--TextField-brandBorderHoverColor)",
            },
            [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: "var(--TextField-brandBorderFocusedColor)",
            },
          },
        },
      },
      MuiFilledInput: {
        styleOverrides: {
          root: {
            "&:before, &:after": {
              borderBottom: "1px solid var(--TextField-brandBorderColor)",
            },
            "&:hover:not(.Mui-disabled, .Mui-error):before": {
              borderBottom: "1px solid var(--TextField-brandBorderHoverColor)",
            },
            "&.Mui-focused:after": {
              borderBottom:
                "1px solid var(--TextField-brandBorderFocusedColor)",
            },
          },
        },
      },
      MuiInput: {
        styleOverrides: {
          root: {
            "&:before": {
              borderBottom: "1px solid var(--TextField-brandBorderColor)",
            },
            "&:hover:not(.Mui-disabled, .Mui-error):before": {
              borderBottom: "1px solid var(--TextField-brandBorderHoverColor)",
            },
            "&.Mui-focused:after": {
              borderBottom:
                "1px solid var(--TextField-brandBorderFocusedColor)",
            },
          },
        },
      },
    },
  });

const cardData = [
  {
    title: "Brochure Details",
    icon: <DateRangeOutlinedIcon />,
  },
  {
    title: "Check Detailed Fees",
    icon: <DateRangeOutlinedIcon />,
  },
  {
    title: "Shortlist & Apply",
    icon: <DateRangeOutlinedIcon />,
  },
  {
    title: "24/7 Counselling",
    icon: <DateRangeOutlinedIcon />,
  },
  {
    title: "Scholarships",
    icon: <DateRangeOutlinedIcon />,
  },
  {
    title: "Application Deadlines",
    icon: <DateRangeOutlinedIcon />,
  },
];

const peopleCard = [
  {
    description:
      "Collegedunia is a one-stop solution to all your education related queries.",
    name: "Gurmeet Singh",
    avatarImg:
      "https://cdn.pixabay.com/photo/2016/03/31/19/56/avatar-1295396_640.png",
  },
  {
    description: "No need to remember deadlines as I get timely updates now.",
    name: "Ridhima Sharma",
    avatarImg:
      "https://cdn.pixabay.com/photo/2016/03/31/19/56/avatar-1295396_640.png",
  },
  {
    description:
      "Because of collegedunia, all my questions regarding JEE Mains were answered.",
    name: "Arnav Chitkar",
    avatarImg:
      "https://cdn.pixabay.com/photo/2016/03/31/19/56/avatar-1295396_640.png",
  },
  {
    description:
      "After subscribing to Collegedunia, I get important alerts about exams on time.",
    name: "Aaravi Sharma",
    avatarImg:
      "https://cdn.pixabay.com/photo/2016/03/31/19/56/avatar-1295396_640.png",
  },
  {
    description: "Authentic student reviews helped me compare colleges easily.",
    name: "Subhash Malhotra",
    avatarImg:
      "https://cdn.pixabay.com/photo/2016/03/31/19/56/avatar-1295396_640.png",
  },
  {
    description:
      "Practice Paper section helped me in preparing without coaching.",
    name: "Sanchi Ahuja",
    avatarImg:
      "https://cdn.pixabay.com/photo/2016/03/31/19/56/avatar-1295396_640.png",
  },
  {
    description:
      "I was anxious about my exam preparation. Collegedunia helped me to ace it.",
    name: "Mayank Sharma",
    avatarImg:
      "https://cdn.pixabay.com/photo/2016/03/31/19/56/avatar-1295396_640.png",
  },
  {
    description: "In depth CAT exam analysis available for free.",
    name: "Ritu Dua",
    avatarImg:
      "https://cdn.pixabay.com/photo/2016/03/31/19/56/avatar-1295396_640.png",
  },
];

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    city: "",
    course: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Frontend validation
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.mobile) newErrors.mobile = "Mobile number is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.course) newErrors.course = "Course is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Backend submission
    try {
      const response = await fetch("http://localhost:3001/submit-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Handle success
        console.log("Form submitted successfully");
      } else {
        // Handle errors
        console.error("Form submission failed");
      }
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };
  const outerTheme = useTheme();
  const [slideIndex, setSlideIndex] = useState(0);

  const handleSlideIndexChange = (index) => {
    setSlideIndex(index);
  };

  const handlePreviousClick = () => {
    setSlideIndex(slideIndex - 1);
  };

  const handleNextClick = () => {
    setSlideIndex(slideIndex + 1);
  };
  return (
    <div className="main-container">
      <div className="left-container">
        <h2 style={{ fontFamily: "Roboto, sans-serif" }}>
          How Collegedunia helps you in <br /> Admission{" "}
        </h2>
        <div className="card-container">
          {cardData.map((item) => (
            <div className="card">
              {item.icon}
              <span style={{ marginTop: "8px" }}>{item.title}</span>
            </div>
          ))}
        </div>
        <div style={{ width: "100%" }}>
          <h2 style={{ fontFamily: "Roboto, sans-serif" }}>What people say</h2>
          <div className="people-container">
            <Carousel
              slidesToShow={1.1}
              renderBottomCenterControls={false}
              renderCenterLeftControls={({ previousSlide }) => (
                <button
                  onClick={() => {
                    handlePreviousClick();
                    previousSlide();
                  }}
                  style={{ display: slideIndex === 0 ? "none" : "block" }}
                >
                  <ArrowBackIosNewIcon style={{ color: "#ff7900" }} />
                </button>
              )}
              renderCenterRightControls={({ nextSlide }) => (
                <button
                  onClick={() => {
                    handleNextClick();
                    nextSlide();
                  }}
                >
                  <ArrowForwardIosIcon style={{ color: "#ff7900" }} />
                </button>
              )}
              defaultControlsConfig={{
                containerClassName: "containerClass",
              }}
              afterSlide={handleSlideIndexChange}
            >
              {peopleCard.map((item) => (
                <div className="people-card">
                  <Avatar alt="Remy Sharp" src={item.avatarImg} />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      rowGap: "12px",
                      width: "100%",
                      paddingRight: "20px",
                    }}
                  >
                    <span style={{ fontFamily: "Roboto, sans-serif" }}>
                      {item.description}
                    </span>
                    <b style={{ fontFamily: "Roboto, sans-serif" }}>
                      {item.name}
                    </b>
                  </div>
                </div>
              ))}
            </Carousel>
          </div>
        </div>
      </div>
      <div className="right-container">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "15px",
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              borderRadius: "50%",
              border: "1px solid gray",
              width: "100px",
              height: "100px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "1px 1px 1px gray",
            }}
          >
            <img
              alt=" logo"
              data-src="https://images.collegedunia.com/public/asset/img/cd-static-nr/leadform_logo.png?h=50&amp;w=50&amp;mode=stretch"
              height="50px"
              src="https://images.collegedunia.com/public/asset/img/cd-static-nr/leadform_logo.png?h=50&amp;w=50&amp;mode=stretch"
              class="jsx-1104583518  lazyloaded"
            ></img>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span className="main-text">Register Now To Apply</span>
            <span className="sub-text">Get details and latest updates</span>
          </div>
        </div>
        <hr style={{ color: "gray" }} />
        <form onSubmit={handleSubmit}>
          <div
            style={{
              width: "100%",
              display: "flex",
              gap: "40px",
              marginTop: "20px",
              marginBottom: "20px",
            }}
          >
            <div
              style={{
                width: "50%",
                display: "flex",
                flexDirection: "column",
                gap: "30px",
              }}
            >
              <ThemeProvider theme={customTheme(outerTheme)}>
                <TextField
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  label="Full Name"
                  placeholder="Full Name"
                  multiline
                  fullWidth
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </ThemeProvider>
              <ThemeProvider theme={customTheme(outerTheme)}>
                <TextField
                  type="tel"
                  id="mobile"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="Mobile number"
                  label="Mobile number"
                  fullWidth
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocalPhoneIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </ThemeProvider>
              <ThemeProvider theme={customTheme(outerTheme)}>
                <TextField
                  type="text"
                  id="course"
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  label="Course Interested In"
                  placeholder="Course Interested In"
                  fullWidth
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SchoolIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </ThemeProvider>
            </div>
            <div
              style={{
                width: "50%",
                display: "flex",
                flexDirection: "column",
                gap: "30px",
              }}
            >
              <ThemeProvider theme={customTheme(outerTheme)}>
                <TextField
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  label="Email Address"
                  placeholder="Email Address"
                  fullWidth
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </ThemeProvider>
              <ThemeProvider theme={customTheme(outerTheme)}>
                <TextField
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  label="City You Live In"
                  fullWidth
                  required
                  placeholder="City You Live In"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocationOnIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </ThemeProvider>
            </div>
          </div>
          <p style={{ fontFamily: "Roboto, sans-serif" }}>
            By submitting this form, you can accept and agree to our{" "}
            <b
              style={{
                color: "rgb(79, 184, 221)",
                fontFamily: "Roboto, sans-serif",
              }}
            >
              Terms of Use
            </b>
          </p>

          <div className="button-container">
            <span className="text">
              Already Registered? Click Here To Login.
            </span>
            <button className="button" type="submit">
              SUBMIT
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
