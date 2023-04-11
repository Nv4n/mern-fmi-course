type IdType = number;

interface PostProps{
    id:IdType;
    title:string;
    content:string;
    authorId:IdType;
    tags:string[];
    imageUrl:string;
    active :boolean;
}
export const Post=(props:PostProps)=>{
    
}