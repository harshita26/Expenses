import React, { useEffect, useState } from "react";
import { TextField, withStyles, Button } from "@material-ui/core";
import useForm from "./useForm";
import { connect } from "react-redux";
import * as actions from "../actions/postMessage";
import ButterToast, { Cinnamon } from "butter-toast";
import { AssignmentTurnedIn } from "@material-ui/icons";

const initialFieldValues = {
    title: '',
    amount:'',
    note: '',
    date:''
}

const styles = theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            color:'white'
        },
    },
    form: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    postBtn: {
        margin:'45px',
        width: "50%",
        backgroundColor:'#03DAC5',
        borderRadius:'22px',
        '&:hover':{
            backgroundColor:'#03ffe6',
        }
    }
})

const PostMessageForm = ({ classes, ...props }) => {

    useEffect(() => {
        if (props.currentId != 0){
            setValues({
                ...props.postMessageList.find(x => x._id == props.currentId)
            })
            setErrors({})
        }
    }, [props.currentId])

    const validate = () => {
        let temp = { ...errors }
        temp.title = values.title ? "" : "This field is required."
        temp.amount = values.amount ? "" : "This field is required."
        temp.note = values.note ? "" : "This field is required."
        temp.date = values.date ? "" : "This field is required."
        setErrors({
            ...temp
        })
        return Object.values(temp).every(x => x == "")
    }

    var {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFieldValues,props.setCurrentId)

    const handleSubmit = e => {
        e.preventDefault()
        const onSuccess = () => {
            ButterToast.raise({
                content: <Cinnamon.Crisp title="Expense"
                    content="Submitted successfully"
                    scheme={Cinnamon.Crisp.SCHEME_PURPLE}
                    icon={<AssignmentTurnedIn />}
                />
            })
            resetForm()
        }
        if (validate()) {
            if (props.currentId == 0)
                props.createPostMessage(values, onSuccess)
            else
                props.updatePostMessage(props.currentId, values, onSuccess)
        }
    }

    return (
        <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`}
            onSubmit={handleSubmit}>
            <TextField
                name="title"
                variant="outlined"
                label="Title"
                fullWidth
                value={values.title}
                onChange={handleInputChange}
                {...(errors.title && { error: true, helperText: errors.title })}
            />
            <TextField
                name="amount"
                variant="outlined"
                label="Amount"
                fullWidth
                value={values.amount}
                onChange={handleInputChange}
                {...(errors.amount && { error: true, helperText: errors.amount })}
            />
            <TextField
                name="note"
                variant="outlined"
                label="Note"
                fullWidth
                value={values.note}
                onChange={handleInputChange}
                {...(errors.note && { error: true, helperText: errors.note })}
            />
            <TextField 
                name="date"
                variant="outlined"
                // defaultValue="2020-10-05"
                label="Date"
                type="date"
                fullWidth
                InputLabelProps={{
                    shrink: true,
                  }}
                value={values.date}
                onChange={handleInputChange}
                {...(errors.date && { error: true, helperText: errors.date })}
            />
            <Button
                variant="contained"
                size="large"
                type="submit"
                className={classes.postBtn}
            >+ ADD EXPENSES</Button>
        </form>
    );
}


const mapStateToProps = state => ({
    postMessageList: state.postMessage.list
})

const mapActionToProps = {
    createPostMessage: actions.create,
    updatePostMessage: actions.update
}


export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(PostMessageForm));