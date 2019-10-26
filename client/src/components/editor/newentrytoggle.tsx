import React, { useState } from "react";
import { connect } from "react-redux";

const NewEntryToggleComponent = (props: any) => {
    const [isNewEntryShown, setNewEntryIsShown] = useState(false);
    const hide = () => setNewEntryIsShown(false);
    const show = () => setNewEntryIsShown(true);

  return (
    <>
        {props.toggle(show)}
        {isNewEntryShown && props.content(hide)}
    </>
  );
}

const mapDispatchToProps = (dispatch: any) => ({  
});

export default connect(
  null,
  mapDispatchToProps
)(NewEntryToggleComponent);
