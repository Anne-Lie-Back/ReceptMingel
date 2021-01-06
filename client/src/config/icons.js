import { Icon, InlineIcon } from "@iconify/react";
import { styled } from 'styletron-react';

import addOutline from '@iconify/icons-gridicons/add-outline';
import minusCircleOutline from '@iconify/icons-eva/minus-circle-outline';
import bxsCameraPlus from '@iconify/icons-bx/bxs-camera-plus';



const StyledIcon = styled(Icon, ({$size, $color}) => ({
    fontSize: $size,
    color: $color,
}));

// For adding
const Add = ({size, color}) => (
    <StyledIcon icon={addOutline} $size = {size} $color = {color}/>
);

// For removing
const Minus = ({size, color}) => (
    <StyledIcon icon={minusCircleOutline} $size = {size} $color = {color}/>
);

// For edit

// For file-upload
const ImageUpload = ({size, color}) => (
    <StyledIcon icon={bxsCameraPlus} $size = {size} $color = {color}/>
);

// For LOGO?

// For header - USER

// For header - SEARCH

// For header - RECIPE

//For header - RECIPEBOOK

const Icons = {
    Add,
    ImageUpload,
    Minus
}

export default Icons