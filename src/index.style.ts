
import exp from "constants";
import { style } from "typestyle"
export const error = style({
    color: "red",
});

export const successButton = style({
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    $nest: {
        "&:hover": {
            backgroundColor: "#45a049",
        },
    },
}); 

export const dangerButton = style({
    backgroundColor: "#f44336",
    color: "white",
    padding: "10px 20px",
    marginLeft: "5px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    $nest: {
        "&:hover": {
            backgroundColor: "#da190b",
        },
    },
});

export const primaryButton = style({
    backgroundColor: "#008CBA",
    color: "white", 
    padding: "10px 20px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    $nest: {
        "&:hover": {
            backgroundColor: "#007bb5",
        },
    },
});

export const buttonDefault = style({
    backgroundColor: "#e7e7e7",
    color: "black",
    padding: "10px 20px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    $nest: {
        "&:hover": {
            backgroundColor: "#d6d6d6",
        },
    },
});

export const formControl = style({
    marginBottom: "10px",
    minHeight: "30px",
    width: "100%",
    $nest: {    
        "& label": {
            display: "block",
            marginBottom: "5px",
            fontWeight: "bold",
        },
        "& input, & select, & textarea": {
            
            padding: "8px",
            boxSizing: "border-box",
            border: "1px solid #ccc",
            borderRadius: "4px",
            
        },
    },
});

export const formControlInline = style({
    marginBottom: "10px",
    display: "inline-block",
    marginRight: "10px",
    $nest: {    
        "& label": {
            display: "block",
            marginBottom: "5px",

            fontWeight: "bold",
        },
        "& input, & select, & textarea": {
            width: "200px",
            padding: "8px",
            boxSizing: "border-box",
            border: "1px solid #ccc",
            borderRadius: "4px",
        },
    },
});