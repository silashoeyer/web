import { getExtensionInstallationLinks } from "../../utils/extension/extensionInstallationLinks";
import { getExtensionInstallationButtonContent } from "../../utils/extension/extensionInstallationButtonContent";
import { runningInChromeDesktop } from "../../utils/misc/browserDetection";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import Modal from "../modal_shared/Modal";
import { Header } from "../modal_shared/Header.sc";
import { Heading } from "../modal_shared/Heading.sc";
import { Main } from "../modal_shared/Main.sc";
import { Footer } from "../modal_shared/Footer.sc";
import { ButtonContainer } from "../modal_shared/ButtonContainer.sc";
import { Button } from "../../pages/_pages_shared/Button.sc";
import FullWidthImage from "../FullWidthImage";
import redirect from "../../utils/routing/routing";

export default function SupportedNotification_NotInstalled({
  handleCloseRedirectionModal,
  open,
}) {
  function handleCancel() {
    handleCloseRedirectionModal();
  }

  return (
    <Modal open={open} onClose={handleCancel}>
      <Header>
        <Heading>
          Enable translating foreign articles with&nbsp;the&nbsp;Zeeguu
          browser&nbsp;
          {runningInChromeDesktop() ? "extension" : "add-on"}
        </Heading>
      </Header>
      <Main>
        <FullWidthImage
          src={"find-extension.png"}
          alt={"Zeeguu browser extension"}
        />
        {runningInChromeDesktop() && (
          <p className="small">
            * Also compatible with <b>Edge</b>, <b>Opera</b>, <b>Vivaldi</b>,
            and <b>Brave</b>. <br></br> Not seeing your browser? The extension
            may still work - try installing it!
          </p>
        )}
        <p className="extra-small">
          To read articles without the extension, click "Add&nbsp;to&nbsp;Saves"
          above their&nbsp;titles.
        </p>
      </Main>
      <Footer>
        <ButtonContainer buttonCountNum={1}>
          <Button
            className={"small"}
            onClick={() => {
              redirect(getExtensionInstallationLinks());
            }}
          >
            {getExtensionInstallationButtonContent()}
            <ArrowForwardRoundedIcon fontSize="small" />
          </Button>
        </ButtonContainer>
      </Footer>
    </Modal>
  );
}
