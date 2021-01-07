import { Icon, InlineIcon } from "@iconify/react";
import { styled } from 'styletron-react';

import addOutline from '@iconify/icons-gridicons/add-outline';
import minusCircleOutline from '@iconify/icons-eva/minus-circle-outline';
import bxsCameraPlus from '@iconify/icons-bx/bxs-camera-plus';
import bxEditAlt from '@iconify/icons-bx/bx-edit-alt';
import bxEdit from '@iconify/icons-bx/bx-edit';



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

// For file-upload
const ImageUpload = ({size, color, handleClick}) => (
    <StyledIcon icon={bxsCameraPlus} $size = {size} $color = {color} onClick = {handleClick}/>
);

// For LOGO?

// For header - USER

// For header - SEARCH

// For header - RECIPE

//For header - RECIPEBOOK

const Icons = {
    Add,
    EditSimple,
    EditBox,
    ImageUpload,
    Minus
}

export default Icons