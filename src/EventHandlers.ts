/*
 *Please refer to https://docs.envio.dev for a thorough guide on all Envio indexer features*
 */
import {
    PegaBallTicketStorageProxyContract_ClaimDataUpdated_loader,
    PegaBallTicketStorageProxyContract_ClaimDataUpdated_handler,
    PegaBallTicketStorageProxyContract_Game_loader,
    PegaBallTicketStorageProxyContract_Game_handler,
    PegaBallTicketStorageProxyContract_GameDataUploaded_loader,
    PegaBallTicketStorageProxyContract_GameDataUploaded_handler,
    PegaBallTicketStorageProxyContract_Initialized_loader,
    PegaBallTicketStorageProxyContract_Initialized_handler,
    PegaBallTicketStorageProxyContract_RoleAdminChanged_loader,
    PegaBallTicketStorageProxyContract_RoleAdminChanged_handler,
    PegaBallTicketStorageProxyContract_RoleGranted_loader,
    PegaBallTicketStorageProxyContract_RoleGranted_handler,
    PegaBallTicketStorageProxyContract_RoleRevoked_loader,
    PegaBallTicketStorageProxyContract_RoleRevoked_handler,
    PegaBallTicketStorageProxyContract_Upgraded_loader,
    PegaBallTicketStorageProxyContract_Upgraded_handler,
} from "../generated/src/Handlers.gen";

import {
    ClaimDataUpdatedEntity,
    GameEntity,
    GameDataUploadedEntity,
    InitializedEntity,
    RoleAdminChangedEntity,
    RoleGrantedEntity,
    RoleRevokedEntity,
    UpgradedEntity,
    EventsSummaryEntity,
} from "./src/Types.gen";

const GLOBAL_EVENTS_SUMMARY_KEY = "GlobalEventsSummary";

const INITIAL_EVENTS_SUMMARY: EventsSummaryEntity = {
    id: GLOBAL_EVENTS_SUMMARY_KEY,
    claimDataUpdatedsCount: BigInt(0),
    gamesCount: BigInt(0),
    gameDataUploadedsCount: BigInt(0),
    initializedsCount: BigInt(0),
    roleAdminChangedsCount: BigInt(0),
    roleGrantedsCount: BigInt(0),
    roleRevokedsCount: BigInt(0),
    upgradedsCount: BigInt(0),
};

PegaBallTicketStorageProxyContract_ClaimDataUpdated_loader(
    ({ event, context }) => {
        context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
    }
);

PegaBallTicketStorageProxyContract_ClaimDataUpdated_handler(
    ({ event, context }) => {
        let summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

        let currentSummaryEntity: EventsSummaryEntity =
            summary ?? INITIAL_EVENTS_SUMMARY;

        let nextSummaryEntity = {
            ...currentSummaryEntity,
            claimDataUpdatedsCount:
                currentSummaryEntity.claimDataUpdatedsCount + BigInt(1),
        };

        let claimDataUpdatedEntity: ClaimDataUpdatedEntity = {
            id: event.transactionHash + event.logIndex.toString(),
            updater: event.params.updater,
            amount: event.params.amount,
            timeUpdated: event.params.timeUpdated,
            eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
        };

        context.EventsSummary.set(nextSummaryEntity);
        context.ClaimDataUpdated.set(claimDataUpdatedEntity);
    }
);

PegaBallTicketStorageProxyContract_Game_loader(({ event, context }) => {
    context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

PegaBallTicketStorageProxyContract_Game_handler(({ event, context }) => {
    let summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

    let currentSummaryEntity: EventsSummaryEntity =
        summary ?? INITIAL_EVENTS_SUMMARY;

    let nextSummaryEntity = {
        ...currentSummaryEntity,
        gamesCount: currentSummaryEntity.gamesCount + BigInt(1),
    };

    let gameEntity: GameEntity = {
        id: event.transactionHash + event.logIndex.toString(),
        gameOwner: event.params.gameOwner,
        game_0: event.params.game[0],
        game_1: event.params.game[1],
        game_2: event.params.game[2],
        game_3: event.params.game[3],
        game_4: event.params.game[4],
        game_5: event.params.game[5],
        ticketType: event.params.ticketType,
        ticketId: event.params.ticketId,
        gameId: event.params.gameId,
        boughtDate: event.params.boughtDate,
        drawDate: event.params.drawDate,
        eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
    };

    context.EventsSummary.set(nextSummaryEntity);
    context.Game.set(gameEntity);
});

PegaBallTicketStorageProxyContract_GameDataUploaded_loader(
    ({ event, context }) => {
        context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
    }
);

PegaBallTicketStorageProxyContract_GameDataUploaded_handler(
    ({ event, context }) => {
        let summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

        let currentSummaryEntity: EventsSummaryEntity =
            summary ?? INITIAL_EVENTS_SUMMARY;

        let nextSummaryEntity = {
            ...currentSummaryEntity,
            gameDataUploadedsCount:
                currentSummaryEntity.gameDataUploadedsCount + BigInt(1),
        };

        let gameDataUploadedEntity: GameDataUploadedEntity = {
            id: event.transactionHash + event.logIndex.toString(),
            uploader: event.params.uploader,
            amount: event.params.amount,
            timeUploaded: event.params.timeUploaded,
            eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
        };

        context.EventsSummary.set(nextSummaryEntity);
        context.GameDataUploaded.set(gameDataUploadedEntity);
    }
);

PegaBallTicketStorageProxyContract_Initialized_loader(({ event, context }) => {
    context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

PegaBallTicketStorageProxyContract_Initialized_handler(({ event, context }) => {
    let summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

    let currentSummaryEntity: EventsSummaryEntity =
        summary ?? INITIAL_EVENTS_SUMMARY;

    let nextSummaryEntity = {
        ...currentSummaryEntity,
        initializedsCount: currentSummaryEntity.initializedsCount + BigInt(1),
    };

    let initializedEntity: InitializedEntity = {
        id: event.transactionHash + event.logIndex.toString(),
        version: event.params.version,
        eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
    };

    context.EventsSummary.set(nextSummaryEntity);
    context.Initialized.set(initializedEntity);
});

PegaBallTicketStorageProxyContract_RoleAdminChanged_loader(
    ({ event, context }) => {
        context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
    }
);

PegaBallTicketStorageProxyContract_RoleAdminChanged_handler(
    ({ event, context }) => {
        let summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

        let currentSummaryEntity: EventsSummaryEntity =
            summary ?? INITIAL_EVENTS_SUMMARY;

        let nextSummaryEntity = {
            ...currentSummaryEntity,
            roleAdminChangedsCount:
                currentSummaryEntity.roleAdminChangedsCount + BigInt(1),
        };

        let roleAdminChangedEntity: RoleAdminChangedEntity = {
            id: event.transactionHash + event.logIndex.toString(),
            role: event.params.role,
            previousAdminRole: event.params.previousAdminRole,
            newAdminRole: event.params.newAdminRole,
            eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
        };

        context.EventsSummary.set(nextSummaryEntity);
        context.RoleAdminChanged.set(roleAdminChangedEntity);
    }
);

PegaBallTicketStorageProxyContract_RoleGranted_loader(({ event, context }) => {
    context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

PegaBallTicketStorageProxyContract_RoleGranted_handler(({ event, context }) => {
    let summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

    let currentSummaryEntity: EventsSummaryEntity =
        summary ?? INITIAL_EVENTS_SUMMARY;

    let nextSummaryEntity = {
        ...currentSummaryEntity,
        roleGrantedsCount: currentSummaryEntity.roleGrantedsCount + BigInt(1),
    };

    let roleGrantedEntity: RoleGrantedEntity = {
        id: event.transactionHash + event.logIndex.toString(),
        role: event.params.role,
        account: event.params.account,
        sender: event.params.sender,
        eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
    };

    context.EventsSummary.set(nextSummaryEntity);
    context.RoleGranted.set(roleGrantedEntity);
});

PegaBallTicketStorageProxyContract_RoleRevoked_loader(({ event, context }) => {
    context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

PegaBallTicketStorageProxyContract_RoleRevoked_handler(({ event, context }) => {
    let summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

    let currentSummaryEntity: EventsSummaryEntity =
        summary ?? INITIAL_EVENTS_SUMMARY;

    let nextSummaryEntity = {
        ...currentSummaryEntity,
        roleRevokedsCount: currentSummaryEntity.roleRevokedsCount + BigInt(1),
    };

    let roleRevokedEntity: RoleRevokedEntity = {
        id: event.transactionHash + event.logIndex.toString(),
        role: event.params.role,
        account: event.params.account,
        sender: event.params.sender,
        eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
    };

    context.EventsSummary.set(nextSummaryEntity);
    context.RoleRevoked.set(roleRevokedEntity);
});

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

