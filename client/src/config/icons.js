import { Icon } from "@iconify/react";
import { styled } from 'styletron-react';
//import THEME from '../config/theme';

//ADD
import addOutline from '@iconify/icons-gridicons/add-outline';
//REMOVE
import minusCircleOutline from '@iconify/icons-eva/minus-circle-outline';
//IMAGE
import bxsCameraPlus from '@iconify/icons-bx/bxs-camera-plus';
//EDIT SIMPLE
import bxEditAlt from '@iconify/icons-bx/bx-edit-alt';
//EDITBOX
import bxEdit from '@iconify/icons-bx/bx-edit';
//EDIT DONE
import bxCheckCircle from '@iconify/icons-bx/bx-check-circle';
//SEARCH
import bxSearch from '@iconify/icons-bx/bx-search';
//USER ICON
import userAvatarFilledAlt from '@iconify/icons-carbon/user-avatar-filled-alt';
//RECIPEBOOK IMAGE
import bxBookReader from '@iconify/icons-bx/bx-book-reader';
//import outlineFoodBank from '@iconify/icons-ic/outline-food-bank';
//import roundFoodBank from '@iconify/icons-ic/round-food-bank';
//RECIPE ICON
import roundRestaurantMenu from '@iconify/icons-ic/round-restaurant-menu';
//COPYRIGHT ICON
import bxCopyright from '@iconify/icons-bx/bx-copyright';
//LINKEDIN
import bxlLinkedinSquare from '@iconify/icons-bx/bxl-linkedin-square';
//STAR ICON for favourite
import roundStarOutline from '@iconify/icons-ic/round-star-outline';
//ACTIVE STARICON for favourite
import roundStarRate from '@iconify/icons-ic/round-star-rate';




const StyledIcon = styled(Icon, ({$size, $color}) => ({
    fontSize: $size,
    color: $color || 'black',
}));

// For adding
const AddIcon = ({size, color, handleClick}) => (
    <StyledIcon icon={addOutline} $size = {size} $color = {color} onClick = {handleClick}/>
);

// For removing
const Minus = ({size, color, handleClick}) => (
    <StyledIcon icon={minusCircleOutline} $size = {size} $color = {color} onClick = {handleClick}/>
);

// For edit
const EditSimple = ({size, color, handleClick}) => (
    <StyledIcon icon={bxEditAlt} $size = {size} $color = {color} onClick = {handleClick}/>
);
// Edit box-style
const EditBox = ({size, color, handleClick}) => (
    <StyledIcon icon={bxEdit} $size = {size} $color = {color} onClick = {handleClick}/>
);
 //Edit done
const Done = ({size, color, handleClick}) => (
    <StyledIcon icon={bxCheckCircle} $size = {size} $color = {color} onClick = {handleClick}/>
);

// For file-upload
const ImageIcon = ({size, color, handleClick}) => (
    <StyledIcon icon={bxsCameraPlus} $size = {size} $color = {color} onClick = {handleClick}/>
);

// For LOGO?

// For header - USER
const User = ({size, color, handleClick}) => (
    <StyledIcon icon={userAvatarFilledAlt} $size = {size} $color = {color} onClick = {handleClick}/>
);

// For header - SEARCH
const Search = ({size, color, handleClick}) => (
    <StyledIcon icon={bxSearch} $size = {size} $color = {color} onClick = {handleClick}/>
);

// For header - RECIPE
const RecipeIcon = ({size, color, handleClick}) => (
    <StyledIcon icon={roundRestaurantMenu} $size = {size} $color = {color} onClick = {handleClick}/>
);

//For header - RECIPEBOOK
const RecipeBook = ({size, color, handleClick}) => (
    <StyledIcon icon={bxBookReader} $size = {size} $color = {color} onClick = {handleClick}/>
);

//Copyright symbol
const CopyrightIcon = ({size, color, handleClick}) => (
    <StyledIcon icon={bxCopyright} $size = {size} $color = {color} onClick = {handleClick}/>
);

//Linkedin
const LinkedinIcon = ({size, color, handleClick}) => (
    <StyledIcon icon={bxlLinkedinSquare} $size = {size} $color = {color} onClick = {handleClick}/>
);

//Favourite
const StarIconUnactive = ({size, color, handleClick}) => (
    <StyledIcon icon={roundStarOutline} $size = {size} $color = {color} onClick = {handleClick}/>
);

const StarIconActive = ({size, color, handleClick}) => (
    <StyledIcon icon={roundStarRate} $size = {size} $color = {color} onClick = {handleClick}/>
);

const Icons = {
    AddIcon,
    EditSimple,
    EditBox,
    Done,
    ImageIcon,
    Minus,
    User,
    Search,
    RecipeIcon,
    RecipeBook,
    CopyrightIcon,
    LinkedinIcon,
    StarIconUnactive,
    StarIconActive
};

export default Icons;