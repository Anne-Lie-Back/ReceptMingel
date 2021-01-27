import { Icon } from "@iconify/react";
import { styled } from 'styletron-react';
//import THEME from '../config/theme';

//TODO Clean and organize this file

//ADD
import addOutline from '@iconify/icons-gridicons/add-outline';

//CLOSE
import bxWindowClose from '@iconify/icons-bx/bx-window-close';

//COPYRIGHT ICON
import bxCopyright from '@iconify/icons-bx/bx-copyright';

//EDITBOX
import bxEdit from '@iconify/icons-bx/bx-edit';

//EDIT DONE
import bxCheckCircle from '@iconify/icons-bx/bx-check-circle';

//EDIT SIMPLE
import bxEditAlt from '@iconify/icons-bx/bx-edit-alt';

//IMAGE
import bxsCameraPlus from '@iconify/icons-bx/bxs-camera-plus';

//LINKEDIN
import bxlLinkedinSquare from '@iconify/icons-bx/bxl-linkedin-square';

//MENU
import roundMenu from '@iconify/icons-ic/round-menu';

//RECIPE ICON
import roundRestaurantMenu from '@iconify/icons-ic/round-restaurant-menu';

//RECIPEBOOK IMAGE
import bxBookReader from '@iconify/icons-bx/bx-book-reader';

//REMOVE
import minusCircleOutline from '@iconify/icons-eva/minus-circle-outline';

//SEARCH
import bxSearch from '@iconify/icons-bx/bx-search';

//STAR ICON for favourite
import roundStarOutline from '@iconify/icons-ic/round-star-outline';

//STARICON ACTIVATE for favourite
import roundStarRate from '@iconify/icons-ic/round-star-rate';

//SWITCH OFF, not shared
import roundRadioButtonUnchecked from '@iconify/icons-ic/round-radio-button-unchecked';

//SWITCH ON, shared
import roundRadioButtonChecked from '@iconify/icons-ic/round-radio-button-checked';

//USER ICON
import userAvatarFilledAlt from '@iconify/icons-carbon/user-avatar-filled-alt';


//STYLETRON STYLING
const StyledIcon = styled(Icon, ({$size, $color}) => ({
    fontSize: $size,
    color: $color || 'black',
}));

// ADD
const AddIcon = ({size, color, handleClick}) => (
    <StyledIcon icon={addOutline} $size = {size} $color = {color} onClick = {handleClick}/>
);

// EDIT
const EditSimple = ({size, color, handleClick}) => (
    <StyledIcon icon={bxEditAlt} $size = {size} $color = {color} onClick = {handleClick}/>
);
// EDIT BOX
const EditBox = ({size, color, handleClick}) => (
    <StyledIcon icon={bxEdit} $size = {size} $color = {color} onClick = {handleClick}/>
);

//CLOSE
const CloseIcon = ({size, color, handleClick}) => {
    <StyledIcon icon={bxWindowClose} $size = {size} $color = {color} onClick = {handleClick}/>
}

//COPYRIGHT symbol
const CopyrightIcon = ({size, color, handleClick}) => (
    <StyledIcon icon={bxCopyright} $size = {size} $color = {color} onClick = {handleClick}/>
);

//EDIT DONE
const Done = ({size, color, handleClick}) => (
    <StyledIcon icon={bxCheckCircle} $size = {size} $color = {color} onClick = {handleClick}/>
);

// IMAGE - file upload
const ImageIcon = ({size, color, handleClick}) => (
    <StyledIcon icon={bxsCameraPlus} $size = {size} $color = {color} onClick = {handleClick}/>
);

//LINKEDIN
const LinkedinIcon = ({size, color, handleClick}) => (
    <StyledIcon icon={bxlLinkedinSquare} $size = {size} $color = {color} onClick = {handleClick}/>
);

//MENU
const MenuIcon = ({size, color, handleClick}) => (
    <StyledIcon icon={roundMenu} $size = {size} $color = {color} onClick = {handleClick}/>
);

// RECIPE - For header
const RecipeIcon = ({size, color, handleClick}) => (
    <StyledIcon icon={roundRestaurantMenu} $size = {size} $color = {color} onClick = {handleClick}/>
);

// REMOVE
const Minus = ({size, color, handleClick}) => (
    <StyledIcon icon={minusCircleOutline} $size = {size} $color = {color} onClick = {handleClick}/>
);

//RECIPEBOOK - For header
const RecipeBook = ({size, color, handleClick}) => (
    <StyledIcon icon={bxBookReader} $size = {size} $color = {color} onClick = {handleClick}/>
);

// SEARCH - For header
const Search = ({size, color, handleClick}) => (
    <StyledIcon icon={bxSearch} $size = {size} $color = {color} onClick = {handleClick}/>
);

//STAR off
const StarIconUnactive = ({size, color, handleClick}) => (
    <StyledIcon icon={roundStarOutline} $size = {size} $color = {color} onClick = {handleClick}/>
);

//STAR on
const StarIconActive = ({size, color, handleClick}) => (
    <StyledIcon icon={roundStarRate} $size = {size} $color = {color} onClick = {handleClick}/>
);

//SWITCH of - shared
const SharedIcon = ({size, color, handleClick}) => (
    <StyledIcon icon={roundRadioButtonChecked} $size = {size} $color = {color} onClick = {handleClick}/>
);

//SWITCH off - unshared
const UnsharedIcon = ({size, color, handleClick}) => (
    <StyledIcon icon={roundRadioButtonUnchecked} $size = {size} $color = {color} onClick = {handleClick}/>
);

// USER -  For header
const User = ({size, color, handleClick}) => (
    <StyledIcon icon={userAvatarFilledAlt} $size = {size} $color = {color} onClick = {handleClick}/>
);

const Icons = {
    AddIcon,
    CloseIcon,
    CopyrightIcon,
    Done,
    EditBox,
    EditSimple,
    ImageIcon,
    LinkedinIcon,
    MenuIcon,
    Minus,
    RecipeBook,
    RecipeIcon,
    Search,
    SharedIcon,
    StarIconActive,
    StarIconUnactive,
    UnsharedIcon,
    User,
};

export default Icons;