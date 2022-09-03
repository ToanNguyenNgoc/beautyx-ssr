import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import scrollTop from "../../../../utils/scrollTop";
import {useElementOnScreen} from '../../../../utils/useElementScreen';
import DialogPost from '../../DialogPostDetail';
// post
import PostHead from './post/PostHead';
import PostReaction from './post/PostReaction';
import PostVideo from './post/PostVideo';
import PostProductList from './post/PostProductList';
import PostComment from './post/PostCmt';
// interface
import { IOrganization } from '../../../../interface/organization';
import { IComment } from '../../../../interface/comments';
import { Service } from '../../../../interface/service';
// api
import { setResetInitialState } from '../../../../redux/video/videosSlice';
import { postAsyncOrgComments } from '../../../../redux/org/orgCommentsSlice';
import { onFavoriteOrg, onDeleteFavoriteOrg } from '../../../../redux/org/orgSlice';
import mediaApi from '../../../../api/mediaApi';
import { clearPrevState } from '../../../../redux/commentSlice';

function VideoItemPc(props: any) {
    const { video, org, cmt, sers, videoCur, setVideoCur } = props;
    const history = useHistory();
    const dispatch = useDispatch();
    const refCurPost = useRef<any>(null);
    
    const USER = useSelector((state: any) => state.USER);
    const COMMENT_STORE = useSelector((state: any) => state.COMMENT).image_url;
    const [cmtDialog,setOpenCmtDialog]  = useState<any>(false);
    const user = USER.USER;
    const options = {
        root: null,
        rootMargin: "0px",
        threshold: 0.3,
    };
    const isVisable = useElementOnScreen(options, refCurPost);
    // ---- interface ----
        interface IReact {
            favoriteCount: number;
            isFavorite: Boolean;
        }
        interface Comments {
            comments?:IComment[]|null;
            totalItem?:number
        }
        interface IData {
            org?: IOrganization | null;
            ser?: Service[]|null;
            cmt?: Comments|undefined|null
        }
    // ---- video ----
        const vd_url = video?.excerpt?.rendered?.slice(10, video?.excerpt?.rendered?.length - 12);
    // ---- end ---- //
    // ---- org - service - comments ---- 
        const [data, setData] = useState<IData|undefined>({
            org: org,
            ser: sers,
            cmt: cmt
        });
        const [reaction, setReaction] = useState<IReact>({
            favoriteCount: org.favorites_count,
            isFavorite: org.is_favorite
        })
        const [comment, setComment] = useState<any>({
            text: '',
            url: video.link,
            image_url: COMMENT_STORE,
            used: true,
            star: 5,
        });
    // ---- end ---- 
        const getComments = (props:any) => {
            setData({ ...data,
                cmt: {  comments:[props.payload.comment,...(data?.cmt?.comments||[])],
                        totalItem: (data?.cmt?.totalItem||0) + 1
                } 
            })
        }
    //  ---- Initial State ---- 
        const getInitialData = async () => {
            if (data?.org && data.org.is_favorite) {
                setReaction({
                    ...reaction,
                    favoriteCount: data.org.favorites_count,
                    isFavorite: data.org.is_favorite
                });

            }
        }
        useEffect(()=>{
            getInitialData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
        },[])
    // handle func
        const handleGoOrgDetail = () => {
        //    alert('detail');
        }
        const handleComment = (e: any) => {
            if (!user) {
                goSignIn();
            }
            else if (user) {
                setComment({
                    ...comment,
                    text: e.target.value
                });
            }
        }
        const handlePostComment = async () => {
            if (comment.text !== '') {
                dispatch(clearPrevState());
                dispatch(
                    postAsyncOrgComments({
                        values: {
                            page: 1,
                            org_id: org.id,
                            body: JSON.stringify({...comment,image_url:COMMENT_STORE}),
                        },
                        user: user,
                    })
                ).then((originRes:any)=>getComments(originRes));
                setComment({ text: '' })
            }
        };

        const handleKeyDown = (event: any) => {
            if (event.code === "Enter" || event?.nativeEvent.keyCode === 13) {
                if (comment.text.length > 0 && user) {
                    handlePostComment();
                    setComment({
                        text: "",
                        // image_url: "",
                    });
                } else {
                    goSignIn();
                }
            }
        };
        const onChangeMedia = (e: any) => {
            const media = e.target.files[0];
            if (user && media) {
                handlePostMedia(media);
            } else if (!user) {
                console.log("comments not found");
                goSignIn();
            }
        };
        const handlePostMedia = async (media: any) => {
            let formData = new FormData();
            formData.append("file", media);
            try {
                const res = await mediaApi.postMedia(formData);
                setComment({
                    ...comment,
                    image_url: res.data.context.original_url,
                });
            } catch (error) {
                console.log(error);
            }
        };
    
        const onRemoveImgTemp = () => {
            setComment({ ...comment, image_url: null });
        };
    // === end ===
        const handleReact = async () => {
            if(user){
                if (reaction.isFavorite) {
                    const res = await dispatch(onDeleteFavoriteOrg(org))
                    dispatch(setResetInitialState(true));
                    console.log(res);
                    setReaction({ favoriteCount: reaction.favoriteCount-1 ,isFavorite: false })
                } else {
                    const res = await dispatch(onFavoriteOrg(org))
                    dispatch(setResetInitialState(true));
                    console.log(res);
                    setReaction({ favoriteCount: reaction.favoriteCount+1 ,isFavorite: true })
                }
            }
            else{
                alert('pls login to like the post!');
                goSignIn();
            }
        }
        const goSignIn = () => {
            scrollTop();
            history.push({
                pathname: '/sign-in',
                search: '1',
                state: { from: '/beautyx-videos' }
            })
        }
        const handleViewAllCmt = () => {
            setOpenCmtDialog(true);
        }
        

    // console.log('render: ' + COMMENT_STORE+'| id: '+org.id, cmt, sers)
    return (
        <div
            ref={refCurPost}
        >
            <PostHead
                org={org}
                video={video}
                handleGoOrgDetail={handleGoOrgDetail}
            />
            <div className="video-item_body">
                <div className="video-item_body-image">
                    <PostVideo
                        vd_url={vd_url}
                        video={video}
                        is_mute={true}
                        videoCur={videoCur}
                        setVideoCur={setVideoCur}
                        setOpenCmtDialog={setOpenCmtDialog}
                    />
                    <PostProductList
                        data={data}
                    />
                </div>
                <PostReaction
                    data={data}
                    ORG_COMMENTS={cmt}
                    reaction={reaction}
                    handleReact={handleReact}
                    handleViewAllCmt={handleViewAllCmt}
                />
                <PostComment
                    data={data}
                    video={video}
                    handleComment={handleComment}
                    comment={comment}
                    setComment={setComment}
                    handleViewAllCmt={handleViewAllCmt}
                    handleKeyDown={handleKeyDown}
                    user={user}
                    handlePostComment={handlePostComment}
                    onChangeMedia={onChangeMedia}
                    onRemoveImgTemp={onRemoveImgTemp}
                />
            </div>
            <DialogPost
                open={cmtDialog}
                setOpen={setOpenCmtDialog}
                vd_url={vd_url}
                video={video}
                videoCur={videoCur}
                setVideoCur={setVideoCur}
                handleComment={handleComment}
                org={org}
                cmt={cmt}
                reaction={reaction}
                handleGoOrgDetail={handleGoOrgDetail}
            />
        </div>
    );
}

export default React.memo(VideoItemPc);