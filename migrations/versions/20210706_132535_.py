"""empty message

Revision ID: f3be1be9e7bf
Revises: 587bdfeaeb01
Create Date: 2021-07-06 13:25:35.534685

"""
from alembic import op
import sqlalchemy as sa

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")


# revision identifiers, used by Alembic.
revision = 'f3be1be9e7bf'
down_revision = '587bdfeaeb01'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('preferences', 'searchHeight')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('preferences', sa.Column('searchHeight', sa.INTEGER(), autoincrement=False, nullable=False))
    # ### end Alembic commands ###
