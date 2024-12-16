import * as s from "./NavOption.sc";
import { isMediumScreenWidth } from "./screenSize";

export default function NavOption({
  linkTo,
  icon,
  isOnStudentSide,
  notification = null,
  text,
  title,
  onClick = () => {},
  currentPath,
  className,
  screenWidth,
}) {
  const Component = linkTo ? s.RouterLink : s.OptionButton;
  const isActive = currentPath?.includes(linkTo);
  const elementTitle = isMediumScreenWidth(screenWidth)
    ? title
      ? title
      : text
    : "";

  return (
    <s.NavOption>
      <Component
        $screenWidth={screenWidth}
        $isActive={isActive}
        $isOnStudentSide={isOnStudentSide}
        className={className}
        onClick={onClick}
        to={linkTo && linkTo}
        title={elementTitle}
      >
        <s.OptionContentWrapper $screenWidth={screenWidth}>
          <s.IconContainer>{icon}</s.IconContainer>
          <s.TextWrapper $screenWidth={screenWidth}>{text}</s.TextWrapper>
          {notification}
        </s.OptionContentWrapper>
      </Component>
    </s.NavOption>
  );
}
