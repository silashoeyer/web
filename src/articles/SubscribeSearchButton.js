import React, { useState, useEffect, useContext } from "react";
import * as s from "./SubscribeSearchButton.sc";
import useSelectInterest from "../hooks/useSelectInterest";
import { toast } from "react-toastify";
import SubscribeToEmailNotificationsButton from "./SubscribeToEmailNotificationsButton";
import { APIContext } from "../contexts/APIContext";

export default function SubscribeSearchButton({ query }) {
  const api = useContext(APIContext);
  const { subscribedSearches, removeSearch, subscribeToSearch } =
    useSelectInterest(api);
  const [buttonText, setButtonText] = useState("");
  const [isSubscribedToSearch, setIsSubscribedToSearch] = useState();

  useEffect(() => {
    if (subscribedSearches) {
      const isSubscribed = subscribedSearches.some(
        (search) => search.search.toLowerCase() === query.toLowerCase(),
      );
      setIsSubscribedToSearch(isSubscribed);
      setButtonText(
        isSubscribed ? "- Remove from Searches" : "+ Add to Searches",
      );
    }
  }, [subscribedSearches, query]);

  const toggleSearchSubscription = () => {
    if (isSubscribedToSearch) {
      const searchToRemove = subscribedSearches.find(
        (search) => search.search === query,
      );
      if (searchToRemove) {
        removeSearch(searchToRemove);
        api.logUserActivity(api.UNSUBSCRIBE_FROM_SEARCH, "", query, "");
        setIsSubscribedToSearch(false);
        toast("Search removed from Searches!");
      }
    } else {
      subscribeToSearch(query);
      api.logUserActivity(api.SUBSCRIBE_TO_SEARCH, "", query, "");
      setIsSubscribedToSearch(true);
      toast("Search added to Searches!");
    }
  };

  return (
    <>
      <s.AddRemoveButton onClick={toggleSearchSubscription}>
        {buttonText}
      </s.AddRemoveButton>

      {isSubscribedToSearch && (
        <SubscribeToEmailNotificationsButton subscribedSearch={query} />
      )}
    </>
  );
}
