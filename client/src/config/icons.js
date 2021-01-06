import { Icon, InlineIcon } from "@iconify/react";
import { styled } from 'styletron-react';

import addOutline from '@iconify/icons-gridicons/add-outline';

const StyledIcon = styled(Icon, ({$size, $color}) => ({
    fontSize: $size,
    color: $color,
}));

// For adding
const AddIcon = ({size, color}) => (
    <StyledIcon icon={addOutline} $size = {size} $color = {color}/>
);

// For removing

// For edit

// For file-upload

// For LOGO?

// For header - USER

// For header - SEARCH

// For header - RECIPE

//For header - RECIPEBOOK

export default AddIcon;