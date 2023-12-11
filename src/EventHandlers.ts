/*
 *Please refer to https://docs.envio.dev for a thorough guide on all Envio indexer features*
 */
import {
  PegaBallTicketStorageProxyContract_Upgraded_loader,
  PegaBallTicketStorageProxyContract_Upgraded_handler,
} from "../generated/src/Handlers.gen";

import {
  UpgradedEntity,
  EventsSummaryEntity
} from "./src/Types.gen";

const GLOBAL_EVENTS_SUMMARY_KEY = "GlobalEventsSummary";

const INITIAL_EVENTS_SUMMARY: EventsSummaryEntity = {
  id: GLOBAL_EVENTS_SUMMARY_KEY,
  upgradedsCount: BigInt(0),
};

PegaBallTicketStorageProxyContract_Upgraded_loader(({ event, context }) => {
  context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

PegaBallTicketStorageProxyContract_Upgraded_handler(({ event, context }) => {
  let summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  let currentSummaryEntity: EventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity = {
    ...currentSummaryEntity,
    upgradedsCount: currentSummaryEntity.upgradedsCount + BigInt(1),
  };

  let upgradedEntity: UpgradedEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    implementation: event.params.implementation,
    eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.EventsSummary.set(nextSummaryEntity);
  context.Upgraded.set(upgradedEntity);
});

