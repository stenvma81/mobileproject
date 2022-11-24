import "./admin.css";
import React from "react";
import { PostListaddmin } from './posts-containers';

export function Onepost(title){
    return(
        <div class="Postlistcontainer">
        <p class="postlisttitles">{title.name}</p>
        <PostListaddmin/>
        </div>
    )
}