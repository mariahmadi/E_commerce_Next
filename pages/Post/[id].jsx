
import axios from "axios";
import Layout from "../../component/Layout";
import Paper from '@mui/material/Paper'
import { useRouter } from "next/router";
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';

import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions'
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import InsertComment from "../Post/Comment";
import moment from 'moment-jalaali'
import { useState } from "react";
//import FavoriteIcon from '@mui/icons-material/Favorite';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
export default function GetPost({ posts }) {

    const router = useRouter()

    const [likeCount, setLikeCount] = useState(0)
    const [dislikeCount, setDislikeCount] = useState(0)
    const [activeBtn, setActiveBtn] = useState("none")

    const handleLikeClick = () => {
        if (activeBtn === "none") {
            setLikeCount(likeCount + 1);
            setActiveBtn("like");
            return;
        }

        if (activeBtn === 'like') {
            setLikeCount(likeCount - 1);
            setActiveBtn("none");
            return;
        }

        if (activeBtn === "dislike") {
            setLikeCount(likeCount + 1);
            setDislikeCount(dislikeCount - 1);
            setActiveBtn("like");
        }
    };
    const handleDisikeClick = () => {
        if (activeBtn === "none") {
            setDislikeCount(dislikeCount + 1);
            setActiveBtn("dislike");
            return;
        }

        if (activeBtn === 'dislike') {
            setDislikeCount(dislikeCount - 1);
            setActiveBtn("none");
            return;
        }

        if (activeBtn === "like") {
            setDislikeCount(dislikeCount + 1);
            setLikeCount(likeCount - 1);
            setActiveBtn("dislike");
        }
    };
    return (
        <>
            <Layout>
                <div className="Post">

                    <h1>Post</h1>


                    <Card sx={{ maxWidth: 345 }}>
                        <CardHeader
                            avatar={
                                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                    R
                                </Avatar>
                            }
                            action={
                                <IconButton aria-label="settings">
                                    <MoreVertIcon />
                                </IconButton>
                            }
                            title={`Author : ${posts.author}`}
                            subheader="September 14, 2016"
                        />
                        <CardMedia
                            sx={{ height: 140 }}
                            image={`/Post/${posts.ImageName}`}
                            title="green iguana"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {posts.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {posts.content}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small">Share</Button>

                            <div onClick={handleLikeClick}>
                                <Button
                                    endIcon={<ThumbUpIcon />}
                                    size="small"  >
                                    {likeCount}
                                </Button>
                            </div>
                            <div onClick={handleDisikeClick}>
                                <Button
                                    size="smail"
                                    endIcon={<ThumbDownAltIcon />}>
                                    {dislikeCount}
                                </Button>
                            </div>
                        </CardActions>
                    </Card>

                    <InsertComment id={posts._id} />


                </div>
                <style jsx>
                    {`
                     .Post{margin-left:15px }

                    `}
                </style>
            </Layout>
        </>

    )


}



export async function getServerSideProps(context) {
    const { id } = context.query;

    const res = await axios.post('http://localhost:3000/api/PostHandler', { id: id })
    const posts = res.data
    console.log(posts)
    return {
        props: {
            posts,
        }
    }
}

