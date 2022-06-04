import Button from '@mui/material/Button';
import BadgeUnstyled, {
  badgeUnstyledClasses,
} from '@mui/base/BadgeUnstyled';
import { styled } from '@mui/material/styles';

const ColorButton = styled(Button)(({ theme }) => ({
  width: 'fit-content',
  color: '#645D62',
  minWidth: 'fit-content',
  padding: '6px',
  backgroundColor: '#CED2C5',
  '&:hover': {
    backgroundColor: '#9fA19B',
  },
  '& .MuiButton-endIcon': {
    margin: 0,
  },
}));

const StyledBadge = styled(BadgeUnstyled)`
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  color: #ced2c5;
  font-size: 24px;
  font-weight: 800;
  list-style: none;
  font-family: Roboto, sans-serif;
  position: relative;
  display: inline-block;
  line-height: 1;

  & .${badgeUnstyledClasses.badge} {
    z-index: auto;
    min-width: 20px;
    height: 20px;
    padding: 0 3px;
    color: #ced2c5;
    font-weight: 400;
    font-size: 12px;
    line-height: 20px;
    white-space: nowrap;
    text-align: center;
    background: #e2626e;
    border-radius: 10px;
    box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
      0px 2px 2px 0px rgba(0, 0, 0, 0.14),
      0px 1px 5px 0px rgba(0, 0, 0, 0.12);
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(50%, -50%);
    transform-origin: 100% 0;
  }
`;

const gameOverStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#CED2C5',
  border: '2px solid #645D62',
  boxShadow: 24,
  p: 4,
};

export { ColorButton, StyledBadge, gameOverStyle };
