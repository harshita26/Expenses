import React, { useEffect, useState, Fragment } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/postMessage";
import { Grid, Paper, withStyles, List, ListItem, ListItemText, Typography, Button } from "@material-ui/core";
import PostMessageForm from "./PostMessageForm";
import ButterToast, { Cinnamon } from "butter-toast";
import { DeleteSweep } from "@material-ui/icons";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const styles = theme => ({
    paper: {
        margin: theme.spacing(3),
        padding: theme.spacing(2)
    },
    smMargin: {
        margin: theme.spacing(1)
    },
    actionDiv: {
        textAlign: "center"
    },
    title:{
        color:"#6200EE",
        fontWeight:'700'
    },
    amount:{
        float:"right",
        fontWeight:'700'
    }
})

const PostMessages = ({ classes, ...props }) => {
    //const {classes, ...props} = props
    const [currentId, setCurrentId] = useState(0)

    useEffect(() => {
        props.fetchAllPostMessages()
    }, [])//DidMount

    const onDelete = id => {
        const onSuccess = () => {
            ButterToast.raise({
                content: <Cinnamon.Crisp title="Expense"
                    content="Deleted successfully"
                    scheme={Cinnamon.Crisp.SCHEME_PURPLE}
                    icon={<DeleteSweep />}
                />
            })
        }
        if (window.confirm('Are you sure to delete this record?'))
            props.deletePostMessage(id,onSuccess)
    }


    return (
        <Grid container>
            <Grid item xs={5}>
                <div className={classes.paper}>
                    <PostMessageForm {...{ currentId, setCurrentId }} />
                </div>
            </Grid>
            <Grid item xs={7}>
                    <List>
                        {
                            props.postMessageList.map((record, index) => {
                                return (
                                    <Fragment key={index}>
                                        <Paper className={classes.paper}>
                                        <ListItem>
                                            <ListItemText>
                                                <Typography >
                                                    {record.date}
                                                </Typography>
                                                <Typography fontWeight={500} className={classes.amount}>
                                                    <span>₹</span>{record.amount}
                                                </Typography>
                                                <Typography variant="h5" className={classes.title}>
                                                    {record.title}
                                                </Typography>                                                 
                                                <div>
                                                    Note: {record.note}
                                                </div>
                                                <div className={classes.actionDiv}>
                                                    <Button variant="contained" color="primary" size="small"
                                                        className={classes.smMargin}
                                                        startIcon={<EditIcon />}
                                                        onClick={() => setCurrentId(record._id)}>
                                                        Edit
                                                    </Button>
                                                    <Button variant="contained" color="secondary" size="small"
                                                        className={classes.smMargin}
                                                        startIcon={<DeleteIcon />}
                                                        onClick={() => onDelete(record._id)}>
                                                        Delete
                                                    </Button>
                                                </div>
                                            </ListItemText>
                                        </ListItem>
                                        </Paper>
                                    </Fragment>                                    
                                )
                            })
                        }
                    </List>
            </Grid>
        </Grid>
    );
}

const mapStateToProps = state => ({
    postMessageList: state.postMessage.list
})

const mapActionToProps = {
    fetchAllPostMessages: actions.fetchAll,
    deletePostMessage: actions.Delete
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(PostMessages));
