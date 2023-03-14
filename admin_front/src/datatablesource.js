//import axios from "axios" ;

// user
export const userColums = [
    { field: 'id', headerName: 'ID', width: 200 },
    {
        field : "Admins" ,
        headerName : "Admins" ,
        width :210 ,
        renderCell :(params) => {
            return(
                <div className="cellWithImg">
                    <img className="cellImg" src={params.row.img} alt="" />
                    {params.row.username}
                </div>
            );
        },
    },
    {
        field : "name" ,
        headerName : "Name" ,
        width :200 ,

    },
    {
        field : "email" ,
        headerName : "Email" ,
        width :200 ,

    },
    {
        field : "age" ,
        headerName : "Age" ,
        width :80 ,

    },
    
    {
        field : "status" ,
        headerName : "Status" ,
        width :140 ,
        renderCell :(params) => {
            return(
                <div className={`cellWithStatus ${params.row.status}`}>
                    {params.row.status}
                </div>
            );
        },

    },
    

    
] 




// tempory data
export const userRows = [
{
    id : 1 ,
    username : "akidu2001" ,
    name : "akidu",
    img : "https://wallpapers.com/images/featured-full/cool-profile-pictures-4co57dtwk64fb7lv.jpg" ,
    role : "user" ,
    age : 34,
    email : "sdfsf@gmail.com" ,
    status : "Activated" ,
},
{
    id : 2 ,
    username : "asdfas" ,
    name : "anuka",
    img : "https://wallpapers.com/images/featured-full/cool-profile-pictures-4co57dtwk64fb7lv.jpg" ,
    role : "user" ,
    age : 34,
    email : "sdfsf@gmail.com" ,
    status : "Deactivated" ,
},
{
    id : 3 ,
    username : "asdfas" ,
    name : "anuka",
    img : "https://wallpapers.com/images/featured-full/cool-profile-pictures-4co57dtwk64fb7lv.jpg" ,
    role : "user" ,
    age : 34,
    email : "sdfsf@gmail.com" ,
    status : "Deactivated" ,
},
{
    id : 4 ,
    username : "asdfas" ,
    name : "anuka",
    img : "https://wallpapers.com/images/featured-full/cool-profile-pictures-4co57dtwk64fb7lv.jpg" ,
    role : "user" ,
    age : 34,
    email : "sdfsf@gmail.com" ,
    status : "Deactivated" ,
},
{
    id : 5 ,
    username : "asdfas" ,
    name : "anuka",
    img : "https://wallpapers.com/images/featured-full/cool-profile-pictures-4co57dtwk64fb7lv.jpg" ,
    role : "user" ,
    age : 34,
    email : "sdfsf@gmail.com" ,
    status : "Deactivated" ,
},
{
    id : 6 ,
    username : "asdfas" ,
    name : "anuka",
    img : "https://wallpapers.com/images/featured-full/cool-profile-pictures-4co57dtwk64fb7lv.jpg" ,
    role : "user" ,
    age : 34,
    email : "sdfsf@gmail.com" ,
    status : "Deactivated" ,
},
{
    id : 7 ,
    username : "asdfas" ,
    name : "anuka",
    img : "https://wallpapers.com/images/featured-full/cool-profile-pictures-4co57dtwk64fb7lv.jpg" ,
    role : "user" ,
    age : 34,
    email : "sdfsf@gmail.com" ,
    status : "Deactivated" ,
},
{
    id : 8 ,
    username : "asdfas" ,
    name : "anuka",
    img : "https://wallpapers.com/images/featured-full/cool-profile-pictures-4co57dtwk64fb7lv.jpg" ,
    role : "user" ,
    age : 34,
    email : "sdfsf@gmail.com" ,
    status : "Deactivated" ,
},
{
    id : 9 ,
    username : "asdfas" ,
    name : "anuka",
    img : "https://wallpapers.com/images/featured-full/cool-profile-pictures-4co57dtwk64fb7lv.jpg" ,
    role : "user" ,
    age : 34,
    email : "sdfsf@gmail.com" ,
    status : "Deactivated" ,
},
{
    id : 10 ,
    username : "asdfas" ,
    name : "anuka",
    img : "https://wallpapers.com/images/featured-full/cool-profile-pictures-4co57dtwk64fb7lv.jpg" ,
    role : "user" ,
    age : 34,
    email : "sdfsf@gmail.com" ,
    status : "Deactivated" ,
},
{
    id : 11 ,
    username : "asdfas" ,
    name : "anuka",
    img : "https://wallpapers.com/images/featured-full/cool-profile-pictures-4co57dtwk64fb7lv.jpg" ,
    role : "user" ,
    age : 34,
    email : "sdfsf@gmail.com" ,
    status : "Deactivated" ,
},
];