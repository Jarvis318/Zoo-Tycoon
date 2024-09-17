import React from 'react';
import { Icon, Button, MenuItem } from 'semantic-ui-react';

const UpgradeItem = ({name, level, price, canAfford, iconName }) => {
    return (
        <MenuItem>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <Icon name={iconName} size='large' />
            <div style={{ marginLeft: '10px' }}>
              <div>{name}: Level {level}</div>
            </div>
          </div>
          <Button
            color={canAfford ? 'orange' : 'grey'}
            disabled={!canAfford}
            fluid
            size='small'
            style={{ marginTop: '5px' }}
          >
            Purchase for ${price}
          </Button>
        </MenuItem>
      );
    };
    
export default UpgradeItem;
