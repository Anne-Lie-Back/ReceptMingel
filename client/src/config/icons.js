import { Icon, InlineIcon } from "@iconify/react";
import { styled } from 'styletron-react';
//import THEME from '../config/theme';

import addOutline from '@iconify/icons-gridicons/add-outline';
import minusCircleOutline from '@iconify/icons-eva/minus-circle-outline';
import bxsCameraPlus from '@iconify/icons-bx/bxs-camera-plus';
import bxEditAlt from '@iconify/icons-bx/bx-edit-alt';
import bxEdit from '@iconify/icons-bx/bx-edit';
import bxCheckCircle from '@iconify/icons-bx/bx-check-circle';
import bxSearch from '@iconify/icons-bx/bx-search';
import userAvatarFilledAlt from '@iconify/icons-carbon/user-avatar-filled-alt';
import bxBookReader from '@iconify/icons-bx/bx-book-reader';
//import outlineFoodBank from '@iconify/icons-ic/outline-food-bank';
//import roundFoodBank from '@iconify/icons-ic/round-food-bank';
import roundRestaurantMenu from '@iconify/icons-ic/round-restaurant-menu';

const StyledIcon = styled(Icon, ({$size, $color}) => ({
    fontSize: $size,
    color: $color || 'black',
}));

// For adding
const Add = ({size, color, handleClick}) => (
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

const EditBox = ({size, color, handleClick}) => (
    <StyledIcon icon={bxEdit} $size = {size} $color = {color} onClick = {handleClick}/>
);

const Done = ({size, color, handleClick}) => (
    <StyledIcon icon={bxCheckCircle} $size = {size} $color = {color} onClick = {handleClick}/>
);

// For file-upload
const ImageUpload = ({size, color, handleClick}) => (
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
const Recipe = ({size, color, handleClick}) => (
    <StyledIcon icon={roundRestaurantMenu} $size = {size} $color = {color} onClick = {handleClick}/>
);

//For header - RECIPEBOOK
const RecipeBook = ({size, color, handleClick}) => (
    <StyledIcon icon={bxBookReader} $size = {size} $color = {color} onClick = {handleClick}/>
);

const Icons = {
    Add,
    EditSimple,
    EditBox,
    Done,
    ImageUpload,
    Minus,
    User,
    Search,
    Recipe,
    RecipeBook
}

export default Icons