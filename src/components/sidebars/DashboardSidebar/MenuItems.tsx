import ArrowDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowUpIcon from "@mui/icons-material/ArrowDropUp";
import {
  Box,
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Theme,
} from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const useStyles = (theme: Theme) =>
  makeStyles({
    listItem: {
      ...theme.typography.body1,
      paddingLeft: theme.spacing(4),
      fontWeight: 300,
    },
    subListItem: {
      paddingLeft: theme.spacing(10),
    },
    activeListItem: {
      color: theme.palette.primary.main,
      borderRight: `3px solid ${theme.palette.primary.main}`,
      fontWeight: 500,
      backgroundColor: alpha(
        theme.palette.primary.main,
        theme.palette.action.selectedOpacity,
      ),
    },
    noBackground: {
      fontWeight: 400,
      backgroundColor: "transparent",
    },
    listItemIconContainer: {
      minWidth: 0,
      marginRight: theme.spacing(2),
    },
    listItemIcon: {
      fontSize: 22,
      transition: theme.transitions.create("transform"),
    },
    activeListItemIcon: {
      transform: "scale(1.1)",
      color: theme.palette.primary.main,
    },
  });

const MenuItems = ({ items = [] }) => {
  const theme = useTheme();
  const classes = useStyles(theme)();
  const router = useRouter();
  const { pathname } = router;

  const [activeLink, setActiveLink] = useState(-1);
  const [activeSubLink, setActiveSubLink] = useState(-1);

  useEffect(() => {
    // Get Active links
    const linkIdx = items.findIndex((item) => item.link === pathname);
    setActiveLink(linkIdx);

    if (linkIdx === -1) {
      items.map(({ nestedItems }, i) => {
        const _found = nestedItems?.findIndex(
          (subItem) => subItem.link === pathname,
        );
        if (_found > -1) {
          setActiveLink(i);
          setActiveSubLink(_found);
        }
      });
    }
  }, [pathname]);

  useEffect(() => {
    // Set collapsed item
    if (activeLink > 0 && items[activeLink]?.nestedItems) {
      setCollapseItem(activeLink);
    }
  }, [activeLink]);

  const [collapseItem, setCollapseItem] = useState(null);

  const handleCollapse = (e, i) => {
    e.stopPropagation();

    if (collapseItem === i) {
      setCollapseItem(null);
    } else {
      setCollapseItem(i);
    }
  };

  return (
    <Box>
      <List disablePadding>
        {items.map((item, i) => {
          const isActiveLink = activeLink === i;

          return (
            <React.Fragment key={i}>
              <ListItem
                button
                className={clsx(
                  classes.listItem,
                  isActiveLink && classes.activeListItem,
                  isActiveLink && activeSubLink > -1 && classes.noBackground,
                )}
                secondaryAction={
                  <>
                    {item.nestedItems && (
                      <>
                        {collapseItem === i ? (
                          <ArrowUpIcon fontSize="small" />
                        ) : (
                          <ArrowDownIcon fontSize="small" />
                        )}
                      </>
                    )}
                  </>
                }
                onClick={(e) =>
                  item.nestedItems
                    ? handleCollapse(e, i)
                    : item.link &&
                      pathname !== item.link &&
                      router.push(item.link)
                }
              >
                <ListItemIcon className={classes.listItemIconContainer}>
                  <item.icon
                    className={clsx(
                      classes.listItemIcon,
                      isActiveLink && classes.activeListItemIcon,
                    )}
                  />
                </ListItemIcon>
                <ListItemText disableTypography primary={item.text} />
              </ListItem>

              {item.nestedItems && (
                <Collapse in={collapseItem === i}>
                  <List disablePadding>
                    {item.nestedItems.map((subItem, j) => {
                      const isActiveSubLink = activeSubLink === j;

                      return (
                        <Link href={subItem.link} key={j}>
                          <ListItem
                            button
                            className={clsx(
                              classes.listItem,
                              isActiveSubLink && classes.activeListItem,
                              classes.subListItem,
                            )}
                          >
                            <ListItemText
                              disableTypography
                              primary={subItem.text}
                            />
                          </ListItem>
                        </Link>
                      );
                    })}
                  </List>
                </Collapse>
              )}
            </React.Fragment>
          );
        })}
      </List>
    </Box>
  );
};

export default MenuItems;
